import React, { useState } from "react";
import { BsPaintBucket } from "react-icons/bs";
import styles from "./ColorPicker.module.scss";

function ColorPicker({ getColor, color }) {
	const [open, setOpen] = useState(false);

	// getColor passes it to the parent for use and saving in db later
	function updateColor(hash) {
		getColor(hash);
	}
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
						style={{ color: "#ADD8E6" }}
						onClick={() => updateColor("#ADD8E6")}
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
