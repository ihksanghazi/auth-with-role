import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRouter from "./routes/UserRoutes.js";
import ProductRouter from "./routes/ProductRoutes.js";
import AuthRouter from "./routes/AuthRoutes.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
	db: db,
});

// (async () => {
// 	await db.sync();
// })();
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: store,
		cookie: {
			secure: false,
			sameSite: "none",
		},
	})
);
app.use(
	cors({
		credentials: true,
		origin: "http://127.0.0.1:5173",
	})
);
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(UserRouter);
app.use(ProductRouter);
app.use(AuthRouter);

// store.sync();

app.listen(process.env.APP_PORT, () => {
	console.log(`Server Running at port ${process.env.APP_PORT}`);
});
