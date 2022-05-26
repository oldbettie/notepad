import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useDrag } from "react-use-gesture";
import axios from "axios";
import styles from "./Note.module.scss";
import Button from "./Button";

function Note({ content }) {
	const { user, setUser } = useContext(UserContext);
	const [notePos, setnotePos] = useState({ x: content.x_axis, y: content.y_axis });
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = "http://localhost:3000/";

	const bindNotePos = useDrag((p) => {
		setnotePos({
			x: p.offset[0],
			y: p.offset[1],
		});
	});
	useEffect(() => {
		document.addEventListener("mouseup", updatePosition);
	}, []);

	function updatePosition() {
		console.log("mouse release");
	}

	function deleteNote(id) {
		axios
			.delete(`${URL}note/${id}`, {
				headers: {
					"x-access-token": token,
				},
			})
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div
			{...bindNotePos()}
			key={content.id}
			className={styles.noteContainer}
			style={{ position: "relative", top: notePos.y, left: notePos.x }}>
			{content.userId === user.id && (
				<Button
					content="-"
					classnames={styles.noteBtn}
					onClick={() => deleteNote(content.id)}
				/>
			)}
			<h6 className={styles.userName}>{content.user.userName}</h6>
			<p className={styles.textarea}>{content.note_text}</p>
			<p>{notePos.x}</p>
			<p>{notePos.y}</p>
		</div>
	);
}

export default Note;
