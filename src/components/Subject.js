import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SubjectEditForm from "./SubjectEditForm";
import Button from "./Button";
import styles from "../pages/Subjects.module.scss";
import InviteButton from "./InviteButton";
import { UserContext } from "../UserContext";

function Subject({ subject }) {
	const URL = process.env.REACT_APP_URL;
	const [edit, setEdit] = useState(true);
	const { user, setUser } = useContext(UserContext);

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
		<div key={subject.id} className={styles.subjectsContainer}>
			{edit ? (
				<div>
					<NavLink to={`/subject/${subject.id}`}>
						<Button content="Join" />
					</NavLink>
					<Button content="Edit" onClick={() => setEdit(!edit)} />
					<Button content="Delete" onClick={() => deleteSubject(subject.id)} />
					<InviteButton subjectId={subject.id}/>
				</div>
			) : (
				<SubjectEditForm id={subject.id} />
			)}
		</div>
	);
}

export default Subject;