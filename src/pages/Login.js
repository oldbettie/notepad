import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserAuth } from "../helpers";
import styles from "./Login.modules.scss";
import Button from "../components/Button";
import { UserContext } from "../UserContext";

function Login() {
	const nav = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const URL = `http://localhost:3000/`;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState(false);
	const [error, setError] = useState("");

	function login(e) {
		e.preventDefault();
		axios
			.post(`${URL}login`, {
				email: email,
				password: password,
			})
			.then((res) => {
				if (!res.data.auth) {
					setLoginStatus(false);
					setEmail(res.data.message);
				} else {
					console.log(res.data);
					setUser({
						id: res.data.userId,
						email: email,
						userName: res.data.userName,
						token: res.data.token,
					});
					localStorage.setItem(
						"userData",
						JSON.stringify({
							token: res.data.token,
							id: res.data.userId,
						})
					);
					setLoginStatus(true);
					nav("/");
				}
			});
	}

	return (
		<div className={styles.formContainer}>
			<h3>{user && user.email}</h3>
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
				<Button content="Sign in" />
			</form>
			{loginStatus && <button onClick={getUserAuth}>Check Auth</button>}
		</div>
	);
}

export default Login;
