import React from "react";
import { MdDownload } from "react-icons/md";
import styles from "./DownloadBtn.module.scss";

function DownloadBtn({ color }) {
	return (
		<div className={styles.download} style={{ color: color }}>
			<MdDownload />
		</div>
	);
}

export default DownloadBtn;
