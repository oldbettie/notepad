import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
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
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				setNote("");
				window.location.reload();
			});
	}

	function passColor(hash) {
		setColor(hash);
		passedColor(hash);
	}
	return (
		<div>
			<ColorPicker getColor={(value) => passColor(value)} color={color} />
			<div className={styles.noteContainer} style={{ backgroundColor: color }}>
				<form onSubmit={submitNote}>
					<h5>{user && user.userName}</h5>
					{note && <Button content="+" classnames={styles.noteBtn} />}

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
	);
}

export default NewNote;
