import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import SubjectEditForm from "./SubjectEditForm";
import Button from "./Button";
import styles from "../components/Subject.module.scss";
import InviteButton from "./InviteButton";

function Subject({ subject }) {
	const URL = process.env.REACT_APP_URL;
	const [edit, setEdit] = useState(true);

	function deleteSubject(id) {
		axios
			.delete(`${URL}subject/${id}`)
			.then(() => {
				console.log(`subject ${id} deleted`);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	}

	return (
		<div key={subject.id} className={styles.subjectContainer}>
			{edit ? (
				<>
					<h4 className={styles.titleHeader}>
						{subject.title}
					</h4>
					<NavLink to={`/subject/${subject.id}`}>
						<Button content="Join" />
					</NavLink>
					<Button content="Edit" onClick={() => setEdit(!edit)} />
					<Button className={styles.deleteBtn} content="Delete" onClick={() => deleteSubject(subject.id)} />
					<InviteButton className={styles.inviteBtn} subjectId={subject.id} />
				</>
			) : (
				<SubjectEditForm id={subject.id} />
			)}
		</div>
	);
}

export default Subject;
