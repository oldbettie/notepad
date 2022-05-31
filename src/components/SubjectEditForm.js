import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import styles from "../components/Subject.module.scss";
import { BiPencil } from "react-icons/bi";

function SubjectEditForm({id}) {
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = process.env.REACT_APP_URL;
	const { user, setUser } = useContext(UserContext);
	const [title, setTitle] = useState("");
	const [participants, setParticipants] = useState(['no participants yet']);
	console.log(user);
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
				console.log(res);
				window.location.reload();
			});
	}

	return (
		<div>
			<form onSubmit={updateSubject}>
				<input
					type="text"
					placeholder="Subject name..."
					size="10"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<button className={styles.editBtn}  type="submit">{<BiPencil />}</button>
			</form>
		</div>
	);
}

export default SubjectEditForm;
