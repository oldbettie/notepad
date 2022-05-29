import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { BsPaintBucket } from "react-icons/bs";
import styles from "./ColorPicker.module.scss";

function ColorPicker({ getColor, color }) {
	const { user, setUser } = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const [passedColor, setPassedColor] = useState(color);

	// getColor passes it to the parent for use and saving in db later
	function updateColor(hash) {
		getColor(hash);
	}

	useEffect(() => {
		if (user) {
			setPassedColor(user.color);
		}
	}, []);
	return (
		<div
			className={styles.pickerContainer}
			onClick={() => setOpen(!open)}
			style={!open ? { width: "40px" } : { width: "180px" }}>
			{!open ? (
				<div className={styles.contentContainer} style={{ color: color }}>
					<BsPaintBucket />
				</div>
			) : (
				<div className={styles.contentContainer}>
					<BsPaintBucket
						style={{ color: "#ffff88" }}
						onClick={() => updateColor("#ffff88")}
					/>
					<BsPaintBucket
						style={{ color: "#FF7F7F" }}
						onClick={() => updateColor("#FF7F7F")}
					/>
					<BsPaintBucket
						style={{ color: "#0096FF" }}
						onClick={() => updateColor("#0096FF")}
					/>
					<BsPaintBucket
						style={{ color: "#00FF00" }}
						onClick={() => updateColor("#00FF00")}
					/>
					<BsPaintBucket style={{ color: color }} />
				</div>
			)}
		</div>
	);
}

export default ColorPicker;
