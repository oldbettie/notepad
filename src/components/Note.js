import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../UserContext";
import { useDrag, useGesture } from "react-use-gesture";
import axios from "axios";
import styles from "./Note.module.scss";
import Button from "./Button";

function Note({ content }) {
	let imageRef = useRef();
	const { user, setUser } = useContext(UserContext);
	let [crop, setCrop] = useState({ x: content.x_axis, y: content.y_axis });
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = "http://localhost:3000/";

	useGesture(
		{
			onDrag: ({ event, offset: [dx, dy] }) => {
				event.stopPropagation();
				setCrop({ x: dx, y: dy });
			},
		},
		{
			domTarget: imageRef,
			eventOptions: { passive: false },
		}
	);

	function updateLocation() {
		axios
			.put(
				`${URL}note/${content.id}`,
				{
					x_axis: crop.x,
					y_axis: crop.y,
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
			ref={imageRef}
			style={{
				left: crop.x,
				position: "absolute",
				top: crop.y,
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
		</div>
	);
}

export default Note;
