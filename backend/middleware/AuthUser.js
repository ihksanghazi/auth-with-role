import Users from "../models/UsersModel.js";

export const verifyUser = async (req, res, next) => {
	const userId = req.cookies.userId || req.session.userId;
	if (!userId) {
		return res.status(401).json({ msg: "Mohon Login Ke Akun Anda" });
	}
	const user = await Users.findOne({
		where: {
			uuid: userId,
		},
	});
	if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
	req.userId = user.id;
	req.role = user.role;
	next();
};

export const adminOnly = async (req, res, next) => {
	const userId = req.cookies.userId || req.session.userId;
	const user = await Users.findOne({
		where: {
			uuid: userId,
		},
	});
	if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
	if (user.role !== "admin")
		return res.status(403).json({ msg: "Akses Terlarang" });
	next();
};
