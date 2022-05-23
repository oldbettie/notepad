import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

function Login() {
	const URL = `http://localhost:3000/`;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");

	function login() {
		axios
			.post(`${URL}login`, {
				email: email,
				password: password,
			})
			.then((res) => {
				if (!res.data.message) {
					setLoginStatus(res.data.message);
				} else {
					console.log(res.data);
					setLoginStatus(res.data[0].email);
				}
			});
	}

	return (
		<div>
			<form onSubmit={login}>
				<h3>Sign in</h3>
				<input
					placeholder="Email..."
					required
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<input
					placeholder="Password..."
					required
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				{/* <NavLink to={"/"}> */}
				<Button content="Sign in" />
				{/* </NavLink> */}
			</form>
			<h2>{loginStatus}</h2>
		</div>
	);
}

export default Login;
