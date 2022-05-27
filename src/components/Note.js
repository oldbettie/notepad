import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../UserContext";
import { useGesture } from "react-use-gesture";
import axios from "axios";
import styles from "./Note.module.scss";
import Button from "./Button";

function Note({ content, scale }) {
	let noteRef = useRef();
	const { user, setUser } = useContext(UserContext);
	let [noteCrop, setNoteCrop] = useState({ x: content.x_axis, y: content.y_axis });
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = process.env.REACT_APP_URL;

	// all the logic for controlling each note individually
	useGesture(
		{
			onDrag: ({ event, movement: [dx, dy] }) => {
				const xCSS = 2550; //250px less then the css
				const yCSS = 1150; //250px less then the css
				event.stopPropagation();
				if (dx <= 0 && dy <= 0) {
					setNoteCrop({ x: 0, y: 0 });
					console.log("first");
				} else if (dx >= xCSS * scale && dy <= 0) {
					setNoteCrop({ x: xCSS, y: 0 });
					console.log("second");
				} else if (dx >= xCSS * scale && dy >= yCSS * scale) {
					setNoteCrop({ x: xCSS, y: yCSS });
					console.log("third");
				} else if (dx <= 0 && dy >= yCSS * scale) {
					setNoteCrop({ x: 0, y: yCSS });
					console.log("fourth");
				} else if (dx < 0) {
					setNoteCrop({ x: 0, y: dy / scale });
					console.log("fifth");
				} else if (dy < 0) {
					setNoteCrop({ x: dx / scale, y: 0 });
					console.log("sixth");
				} else if (dy >= yCSS * scale) {
					setNoteCrop({ x: dx / scale, y: yCSS });
					console.log("seventh");
				} else if (dx >= xCSS * scale) {
					setNoteCrop({ x: xCSS, y: dy / scale });
					console.log("eight");
				} else {
					setNoteCrop({ x: dx / scale, y: dy / scale });
				}
			},
		},
		{
			drag: {
				initial: () => [noteCrop.x * scale, noteCrop.y * scale],
			},
			domTarget: noteRef,
			eventOptions: { passive: false },
			preventDefault: true,
		}
	);

	// updates the location on the subject board
	function updateLocation() {
		axios
			.put(
				`${URL}note/${content.id}`,
				{
					x_axis: noteCrop.x,
					y_axis: noteCrop.y,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {})
			.catch((err) => {
				console.log(err);
			});
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
			.catch((err) => {});
	}

	return (
		<div
			key={content.id}
			className={styles.noteContainer}
			ref={noteRef}
			style={{
				left: noteCrop.x,
				position: "absolute",
				top: noteCrop.y,
				touchAction: "none",
			}}
			onMouseUp={updateLocation}>
			{content.userId === user.id && (
				<Button
					content="-"
					classnames={styles.noteBtn}
					onClick={() => deleteNote(content.id)}
				/>
			)}
			<h6 className={styles.userName}>{content.user.userName}</h6>
			<p className={styles.textarea}>{content.note_text}</p>
			{/* <p>{Math.round(noteCrop.x)} X</p>
			<p>{Math.round(noteCrop.y)} Y</p>
			<p>{scale}</p> */}
		</div>
	);
}

export default Note;
