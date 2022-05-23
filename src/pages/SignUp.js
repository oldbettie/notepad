import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

function SignUp() {
	// this line needs to be in every component that needs auth
	axios.defaults.withCredentials = true;

	const URL = `http://localhost:3000/`;
	const [username, setUsername] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [status, setStatus] = useState("");

	function register(e) {
		e.preventDefault();
		console.log("form submitted");
		axios
			.post(`http://localhost:3000/signup`, {
				userName: username,
				email: registerEmail,
				password: registerPassword,
			})
			.then((res) => {
				console.log(res);
				setStatus(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div>
			<form onSubmit={register}>
				<h3>Register User</h3>
				<input
					placeholder="username"
					required
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<input
					placeholder="Email..."
					required
					onChange={(event) => {
						setRegisterEmail(event.target.value);
					}}
				/>
				<input
					placeholder="Password..."
					required
					type="password"
					onChange={(event) => {
						setRegisterPassword(event.target.value);
					}}
				/>
				{/* <NavLink to={"/"}> */}
				<Button content="Register" />
				{/* </NavLink> */}
			</form>
			{/* <h2>{status}</h2> */}
		</div>
	);
}

export default SignUp;
