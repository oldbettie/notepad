import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SubjectEditForm from "./SubjectEditForm";
import Button from "./Button";
import styles from "../pages/Subjects.module.scss";

function Subject({ subject }) {
	const [edit, setEdit] = useState(true);

	function deleteSubject(id) {
		axios
			.delete(`${URL}subject/${id}`)
			.then(() => {
				console.log(`subject ${id} deleted`);
			})
			.then(window.location.reload());
	}

	return (
		<div key={subject.id} className={styles.subjectsContainer}>
			<h2>{subject.title}</h2>
			{edit ? (
				<div>
					<NavLink to={`/subject/${subject.id}`}>
						<Button content="Join" />
					</NavLink>
					<Button content="Edit" onClick={() => setEdit(!edit)} />
					<Button content="Delete" onClick={() => deleteSubject(subject.id)} />
				</div>
			) : (
				<SubjectEditForm id={subject.id} />
			)}
		</div>
	);
}

export default Subject;
