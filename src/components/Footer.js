import styles from "./Footer.module.scss";

import React from "react";

function Footer() {
	return (
		<footer className={styles.footer}>
			<h4>Created by: Jayj Eaton & Pedro Vivas -|- Design by: Leila O'sullivan</h4>
			<h5>Built using React and Express</h5>
		</footer>
	);
}

export default Footer;
