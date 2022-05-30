import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { AiOutlineDelete } from "react-icons/ai";
import { BsStickyFill, BsSticky } from "react-icons/bs";
import axios from "axios";
import Button from "../components/Button";
import styles from "./NewNote.module.scss";
import ColorPicker from "./ColorPicker";

function NewNote({ passedColor }) {
	const URL = process.env.REACT_APP_URL;
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [note, setNote] = useState(null);
	const [color, setColor] = useState("#ffff88");
	const [message, setMessage] = useState(true);
	const [messageOp, setMessageOp] = useState(0);
	const [noteState, setNoteState] = useState(false);

	useEffect(() => {
		if (user) {
			setColor(user.color);
		}
	}, [user]);

	function submitNote(e) {
		const data = localStorage.getItem("userData");
		const token = JSON.parse(data).token;

		e.preventDefault();
		axios
			.post(
				`${URL}notes/new`,
				{
					note_text: note,
					x_axis: 200,
					y_axis: 200,
					subjectId: params.id,
					userId: user.id,
					color: color,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				setNote("");
				setMessageOp(1);
				setNoteState(!noteState);
				setTimeout(() => setMessageOp(0), 3000);
			});
	}

	function passColor(hash) {
		setColor(hash);
		passedColor(hash);
	}
	function closeNoteBox() {
		setNoteState(!noteState);
		setNote("");
	}
	return (
		<div>
			{message && (
				<div className={styles.postedMessage} style={{ opacity: messageOp }}>
					<h3 style={{ color: color }}>Submitted Note!</h3>
				</div>
			)}
			{noteState ? (
				<div>
					<ColorPicker getColor={(value) => passColor(value)} color={color} />
					<div
						className={styles.noteContainer}
						style={{ backgroundColor: color }}>
						<Button
							content={<AiOutlineDelete />}
							classnames={styles.closeNote}
							onClick={closeNoteBox}
						/>
						<form onSubmit={submitNote}>
							<h5>{user && user.userName}</h5>
							{note && (
								<Button
									content={<BsSticky />}
									classnames={styles.noteBtn}
								/>
							)}

							<textarea
								className={styles.textarea}
								type="textarea"
								placeholder="content..."
								value={note || ""}
								onChange={(e) => {
									setNote(e.target.value);
								}}
							/>
						</form>
					</div>
				</div>
			) : (
				<div
					onClick={() => setNoteState(!noteState)}
					className={styles.messageSelector}
					style={{ backgroundColor: color }}>
					<BsStickyFill />
				</div>
			)}
		</div>
	);
}

export default NewNote;
