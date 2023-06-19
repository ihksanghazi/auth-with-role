import { Sequelize } from "sequelize";

const db = new Sequelize("auth_role_permission", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

export default db;
