import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import styles from "./SubjectEdit.module.scss";
import Button from "./Button";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";

function SubjectEditForm({ id, closeBox }) {
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = process.env.REACT_APP_URL;
	const { user, setUser } = useContext(UserContext);
	const [title, setTitle] = useState("");
	const [participants, setParticipants] = useState(["no participants yet"]);
	function updateSubject(e) {
		e.preventDefault();
		axios
			.put(
				`${URL}subject/${id}`,
				{
					title,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				window.location.reload();
			});
	}

	return (
		<div className={styles.subjectContainer}>
			<form onSubmit={updateSubject}>
				<input
					type="text"
					placeholder="Subject name..."
					required
					size="10"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<button className={`${styles.formBtn} ${styles.Btn}`} type="submit">
					{<AiOutlinePlusCircle />}
				</button>
			</form>
			<Button
				content={<AiOutlineDelete />}
				classnames={`${styles.closeBtn} ${styles.Btn}`}
				onClick={closeBox}
			/>
		</div>
	);
}

export default SubjectEditForm;
