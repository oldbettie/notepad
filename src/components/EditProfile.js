import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import Button from "./Button";
import styles from "../pages/Profile.module.scss";

function EditProfile() {
	const URL = process.env.REACT_APP_URL;
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [userName, setUserName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [color, setColor] = useState("#ffff88");
	const [error, setError] = useState("");

	function updateUser(e) {
		e.preventDefault();
		if (checkColorCode(color)) {
			const data = localStorage.getItem("userData");
			const token = JSON.parse(data).token;
			axios
				.put(
					`${URL}users/${params.id}`,
					{
						id: params.id,
						firstName: firstName,
						lastName: lastName,
						userName: userName,
						color: color,
					},
					{
						headers: {
							"x-access-token": token,
						},
					}
				)
				.then((res) => {
					setError("");
					window.location.reload();
				});
		} else {
			setError("code not accepted");
		}
	}

	function checkColorCode(str) {
		const regexHex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
		if (str === "") {
			return false;
		}
		if (str.match(regexHex)) {
			return true;
		} else return false;
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
					<input
						placeholder="set Custom color must be real hexcode"
						type="text"
						value={color || ""}
						onChange={(event) => {
							setColor(event.target.value);
						}}
					/>
					<Button content="Update" />
				</form>
				<h4>{error}</h4>
			</div>
		)
	);
}

export default EditProfile;
