import React from "react";
import { MdDownload } from "react-icons/md";
import styles from "./DownloadBtn.module.scss";

function DownloadBtn({ notes, title }) {
	function downloadNotes() {
		const downloadArr = [];
		notes.forEach((note) => {
			downloadArr.push(`${note.user.userName}:\n${note.note_text}\n`);
		});

		const e = document.createElement("a");
		const file = new Blob(downloadArr, { type: "text/plain" });
		e.href = URL.createObjectURL(file);
		e.download = `${title}.txt`;
		document.body.appendChild(e);
		e.click();
	}

	return (
		<div className={styles.download} onClick={downloadNotes}>
			<MdDownload />
		</div>
	);
}

export default DownloadBtn;
