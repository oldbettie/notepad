import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import Button from "../components/Button";
import { UserContext } from "../UserContext";
import Footer from "../components/Footer";

function Login() {
	const nav = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const URL = process.env.REACT_APP_URL;
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
					setError(res.data.message);
				} else {
					console.log(res.data);
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

					setLoginStatus(true);
					nav(`/subjects/${res.data.userId}`);
				}
			})
			.catch((err) => setError(err));
	}

	return (
		<div className={styles.background}>
			<div className={styles.formPadding}>
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
						<Button content="Sign in" classnames={styles.btnLogin} />
						{error && <h4>{error}</h4>}
					</form>
					<div className={styles.signupContainer}>
						<h4>Not a member?? sign up today!! </h4>
						<NavLink to={"/signup"}>
							<Button content="Sign Up" classnames="btn btnNav btnLogin" />
						</NavLink>
					</div>
					{loginStatus && <h3>{error}</h3>}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Login;
