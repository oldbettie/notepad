import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import styles from "./SignUp.module.scss";
import { UserContext } from "../UserContext";
import Footer from "../components/Footer";

function SignUp() {
	// this line needs to be in every component that needs auth
	axios.defaults.withCredentials = true;

	const nav = useNavigate();
	const URL = process.env.REACT_APP_URL;
	const { user, setUser } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [status, setStatus] = useState(null);

	function register(e) {
		e.preventDefault();
		console.log("form submitted");
		axios
			.post(`${URL}signup`, {
				userName: username,
				email: registerEmail,
				password: registerPassword,
			})
			.then((res) => {
				console.log(res);
				if (res.data.state) {
					axios
						.post(`${URL}login`, {
							email: registerEmail,
							password: registerPassword,
						})
						.then((res) => {
							if (!res.data.auth) {
								setStatus(res.data.message);
							} else {
								setStatus(res.data.message);
								setUser({
									auth: true,
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
								nav(`/subjects/${res.data.userId}`);
							}
						});
				} else {
					setStatus(res.data.message);
					console.log(res.data);
				}
			})
			.catch((err) => {
				setStatus(err.message);
				console.log(err);
			});
	}

	return (
		<div className={styles.background}>
			<div className={styles.formPadding}>
				<div className={styles.formContainer}>
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
							type="email"
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
					{status != null && <h2>{status}</h2>}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default SignUp;
