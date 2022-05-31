import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import SubjectEditForm from "./SubjectEditForm";
import Button from "./Button";
import styles from "./Subject.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

function Subject({ subject }) {
	const URL = process.env.REACT_APP_URL;
	const [edit, setEdit] = useState(true);
	const FRONT = process.env.FRONT;
	const [inviteLink, setInviteLink] = useState("");
	const linkText = `${FRONT}subject/${subject.id}`;
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setInviteLink(linkText);
	}, [subject]);

	const copyTextToClipboard = async () => {
		await navigator.clipboard.writeText(inviteLink);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
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
					<h4 className={styles.titleHeader}>{subject.title}</h4>
					{copied && (
						<div className={styles.popUp}>
							<h4>Copied to Clipboard!!</h4>
						</div>
					)}
					<Button
						content={<BiPencil />}
						classnames={`${styles.editBtn} ${styles.Btn}`}
						onClick={() => setEdit(!edit)}
					/>

					<Button
						content={<AiOutlineDelete />}
						classnames={`${styles.deleteBtn} ${styles.Btn}`}
						onClick={() => deleteSubject(subject.id)}
					/>

					<Button
						content={<FiUsers />}
						classnames={`${styles.inviteBtn} ${styles.Btn}`}
						onClick={() => copyTextToClipboard()}
					/>

					{/* <InviteButton className={styles.inviteBtn} subjectId={<FiUsers />} /> */}
					<NavLink to={`/subject/${subject.id}`}>
						<Button
							content="Enter"
							classnames={`${styles.joinBtn} ${styles.Btn}`}></Button>
					</NavLink>
				</>
			) : (
				<SubjectEditForm id={subject.id} closeBox={() => setEdit(!edit)} />
			)}
		</div>
	);
}

export default Subject;
