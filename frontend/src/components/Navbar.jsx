import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const logout = () => {
		dispatch(LogOut());
		dispatch(reset());
		navigate("/");
	};
	return (
		<div>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<NavLink to="/dashboard" className="navbar-item">
						<img
							src="https://bulma.io/images/bulma-logo.png"
							width="112"
							height="28"
							alt="logo"
						/>
					</NavLink>

					<a
						href="!#"
						role="button"
						className="navbar-burger"
						aria-label="menu"
						aria-expanded="false"
						data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbarBasicExample" className="navbar-menu">
					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<button onClick={logout} className="button is-light">
									Logout
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
