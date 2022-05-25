import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import Button from "./Button";
import styles from "../pages/Profile.module.scss";

function EditProfile() {
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [userName, setUserName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setlastName] = useState("");

	function updateUser(e) {
		const data = localStorage.getItem("userData");
		const token = JSON.parse(data).token;
		e.preventDefault();
		const URL = `http://localhost:3000/users/${params.id}`;
		axios
			.put(
				URL,
				{
					id: params.id,
					firstName: firstName,
					lastName: lastName,
					userName: userName,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				window.location.reload();
			});
	}

	useEffect(() => {
		if (user !== null) {
			setFirstName(user.firstName);
			setlastName(user.lastName);
			setUserName(user.userName);
		}
	}, [user]);

	return (
		user && (
			<div className={styles.formContainer}>
				<form onSubmit={updateUser}>
					<h3>Update user info</h3>
					<label>First Name</label>
					<input
						placeholder="You can leave this blank if you like.."
						type="text"
						value={firstName || ""}
						onChange={(event) => {
							setFirstName(event.target.value);
						}}
					/>
					<label>Last Name</label>
					<input
						placeholder="You can leave this blank if you like.."
						type="text"
						value={lastName || ""}
						onChange={(event) => {
							setlastName(event.target.value);
						}}
					/>
					<label>Username</label>
					<input
						placeholder="Username is required"
						required
						type="text"
						value={userName || ""}
						onChange={(event) => {
							setUserName(event.target.value);
						}}
					/>
					<Button content="Update" />
				</form>
			</div>
		)
	);
}

export default EditProfile;
