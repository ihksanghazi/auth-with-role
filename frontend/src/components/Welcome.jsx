import { useSelector } from "react-redux";

const Welcome = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<>
			<h1 className="title">Dashboard</h1>
			<h2 className="subtitle">
				Welcome Back <strong>{user && user.name}</strong>
			</h2>
		</>
	);
};

export default Welcome;
