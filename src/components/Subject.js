import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import SubjectEditForm from "./SubjectEditForm";
import styles from "../components/Subject.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

function Subject({ subject }) {
	const URL = process.env.REACT_APP_URL;
	const [edit, setEdit] = useState(true);
	const FRONT = process.env.FRONT;
	const [inviteLink, setInviteLink] = useState("");
	const linkText = `${FRONT}subject/${subject.id}`;
	
	useEffect(() => {
		setInviteLink(linkText);
	}, [subject]);

	const copyTextToClipboard = async () => {
		await navigator.clipboard.writeText(inviteLink);
	};

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
					<button className={styles.editBtn} onClick={() => setEdit(!edit)} >{<BiPencil />}</button>
					<button className={styles.deleteBtn} onClick={() => deleteSubject(subject.id)}>{<AiOutlineDelete />}</button>
					<button className={styles.inviteBtn} onClick={() => copyTextToClipboard()}><FiUsers /></button>
					<NavLink to={`/subject/${subject.id}`}>
						Join
					</NavLink>
				</>		
			) : (
				<SubjectEditForm id={subject.id} />
			)}
		</div>	
	);
}

export default Subject;
