import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import styles from "./Users.module.scss";

function Users({ color }) {
	const [open, setOpen] = useState(false);

	return (
		<div
			className={styles.userContainer}
			onClick={() => setOpen(!open)}
			style={
				!open
					? { width: "40px", height: "40px" }
					: { width: "180px", height: "280px" }
			}>
			{!open ? (
				<div className={styles.userContentContainer} style={{ color: color }}>
					<CgProfile />
				</div>
			) : (
				<div className={styles.userContentContainer}></div>
			)}
		</div>
	);
}

export default Users;
