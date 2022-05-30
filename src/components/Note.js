import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useGesture } from "react-use-gesture";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsSticky } from "react-icons/bs";
import axios from "axios";
import styles from "./Note.module.scss";
import Button from "./Button";

function Note({ content, scale, load, keyID }) {
	let noteRef = useRef();
	const { user } = useContext(UserContext);
	let [noteCrop, setNoteCrop] = useState({ x: content.x_axis, y: content.y_axis });
	const [mouse, setMouse] = useState("grab");
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = process.env.REACT_APP_URL;
	const [editState, setEditState] = useState(false);
	const [text, setText] = useState(content.note_text);

	// all the logic for controlling each note individually
	useGesture(
		{
			onDrag: ({ event, movement: [dx, dy] }) => {
				const xCSS = 2950; //250px less then the css
				const yCSS = 1450; //250px less then the css
				event.stopPropagation();
				if (dx <= 0 && dy <= 0) {
					setNoteCrop({ x: 0, y: 0 });
				} else if (dx >= xCSS * scale && dy <= 0) {
					setNoteCrop({ x: xCSS, y: 0 });
				} else if (dx >= xCSS * scale && dy >= yCSS * scale) {
					setNoteCrop({ x: xCSS, y: yCSS });
				} else if (dx <= 0 && dy >= yCSS * scale) {
					setNoteCrop({ x: 0, y: yCSS });
				} else if (dx < 0) {
					setNoteCrop({ x: 0, y: dy / scale });
				} else if (dy < 0) {
					setNoteCrop({ x: dx / scale, y: 0 });
				} else if (dy >= yCSS * scale) {
					setNoteCrop({ x: dx / scale, y: yCSS });
				} else if (dx >= xCSS * scale) {
					setNoteCrop({ x: xCSS, y: dy / scale });
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
		setMouse("grab");
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

	function editNote(e) {
		e.preventDefault();
		axios
			.put(
				`${URL}note/${content.id}`,
				{
					note_text: text,
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
		setEditState(!editState);
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

	function mouseDown() {
		setMouse("grabbing");
	}

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			e.ctrlKey && setMouse("zoom-in");
		});
		document.addEventListener("keyup", (e) => {
			!e.ctrlKey && setMouse("grab");
		});
	}, []);

	if (load) {
		return (
			<div
				key={keyID}
				className={styles.noteContainer}
				ref={noteRef}
				style={{
					backgroundColor: content.color || "#ffff88",
					left: noteCrop.x,
					position: "absolute",
					top: noteCrop.y,
					touchAction: "none",
					cursor: mouse,
				}}
				onMouseDown={mouseDown}
				onMouseUp={updateLocation}>
				{content.userId === user.id && (
					<div>
						<Button
							style={{ color: content.color }}
							content={<AiOutlineDelete />}
							classnames={styles.noteBtn}
							onClick={() => deleteNote(content.id)}
						/>
						{!editState ? (
							<div>
								<Button
									style={{ color: content.color }}
									content={<BiPencil />}
									classnames={styles.noteEditBtn}
									onClick={() => setEditState(!editState)}
								/>
								<p className={styles.textarea}>{text}</p>
							</div>
						) : (
							""
						)}
					</div>
				)}
				{editState ? (
					<form onSubmit={editNote}>
						<textarea
							style={{ border: "1px solid black" }}
							className={styles.textarea}
							required
							type="textarea"
							value={text || ""}
							onChange={(e) => {
								setText(e.target.value);
							}}
							onBlur={() => setEditState(!editState)}
						/>
						<Button
							style={{ color: content.color }}
							content={<BsSticky />}
							classnames={styles.noteEditBtn}
						/>
					</form>
				) : (
					""
				)}
				<h4 className={styles.userName}>{content.user.userName}</h4>
			</div>
		);
	}
}

export default Note;
