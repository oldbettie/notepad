import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styles from "./Home.module.scss";

function Home() {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (user != null) {
			setStatus(user.auth);
			setEmail(user.email);
		} else {
			setStatus(false);
		}
	}, [user]);

	return (
		<div>
			{status ? <h3>Welcome back: {email}</h3> : ""}

			<div className={styles.logoContainer}>
				<div className={styles.postit}>
					<h1 className={styles.logo}>TEAM NOTES</h1>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
				</div>
			</div>
		</div>
	);
}

export default Home;
