import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styles from "./Home.module.scss";
import Footer from "../components/Footer";

function Home() {
	const { user } = useContext(UserContext);
	const nav = useNavigate();

	useEffect(() => {
		if (user) {
			nav(`/subjects/${user.id}`);
		}
	}, [user]);

	return (
		<main>
			<div className={styles.mainContainer}>
				<div className={styles.background}></div>
				<div className={styles.titleDiv}>
					<div className={styles.blockoutBox}></div>
					<h1 className={styles.title}>Team Notes</h1>
					<p>Your teams new notebook..</p>
				</div>
				<h3 className={styles.bio}>Interact as a group to share notes.</h3>
				<h3 className={styles.bioSecondary}>
					These can be saved or downloaded and used later..
				</h3>
			</div>
			<Footer />
		</main>
	);
}

export default Home;
