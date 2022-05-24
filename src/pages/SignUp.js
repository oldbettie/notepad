import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import style from "./SignUp.module.scss";
import { UserContext } from "../UserContext";

function SignUp() {
	// this line needs to be in every component that needs auth
	axios.defaults.withCredentials = true;

	const nav = useNavigate();
	const URL = `http://localhost:3000/`;
	const { user, setUser } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [status, setStatus] = useState("");
	const [loginStatus, setLoginStatus] = useState(false);

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
				if (res.status === 200) {
					// then login and redirect
					axios
						.post(`${URL}login`, {
							email: registerEmail,
							password: registerPassword,
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
					//------
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className={style.formContainer}>
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
