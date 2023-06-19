import Users from "../models/UsersModel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const login = async (req, res) => {
	const user = await Users.findOne({
		where: {
			email: req.body.email,
		},
	});
	if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
	const match = await argon2.verify(user.password, req.body.password);
	if (!match) return res.status(400).json({ msg: "Wrong Password" });
	req.session.userId = user.uuid;
	res.cookie("userId", user.uuid, {
		maxAge: 60 * 60 * 24 * 1000, // Durasi cookie dalam milidetik (misalnya 1 hari)
		httpOnly: true, // Hanya dapat diakses melalui HTTP
		sameSite: "None",
		secure: true,
	});
	const { uuid, name, email, role } = user;
	res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
	const userId = req.cookies.userId || req.session.userId;
	if (!userId) {
		return res.status(401).json({ msg: "Mohon Login Ke Akun Anda" });
	}
	const user = await Users.findOne({
		attributes: ["uuid", "name", "email", "role"],
		where: {
			uuid: userId,
		},
	});
	if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
	res.status(200).json(user);
};

export const logout = (req, res) => {
	res.clearCookie("userId", { secure: true });
	res.cookie("userId", null, {
		expires: new Date(0),
		sameSite: "None",
		httpOnly: true,
		secure: true,
	});

	req.session.destroy((err) => {
		if (err) return res.status(400).json({ msg: "Tidak Dapat Logout" });
		res.status(200).json({ msg: "Berhasil Logout" });
	});
};
