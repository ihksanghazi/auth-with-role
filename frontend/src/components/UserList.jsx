import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const response = await axios.get("http://localhost:5000/users");
		setUsers(response.data);
	};

	const deleteUser = async (userId) => {
		await axios.delete(`http://localhost:5000/users/${userId}`);
		getUsers();
	};

	return (
		<>
			<h1 className="title">Users</h1>
			<h2 className="subtitle">List of Users</h2>
			<Link to="/users/add" className="button is-primary mb-2">
				Add User
			</Link>
			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user.uuid}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<Link
									className="button is-small is-info"
									to={`/users/edit/${user.uuid}`}>
									Edit
								</Link>
								<button
									className="button is-small is-danger"
									onClick={() => {
										deleteUser(user.uuid);
									}}>
									Hapus
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default UserList;
