import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "../components/Subject.module.scss";
import Button from "./Button";

function SubjectParticipant({ subject }) {
	const URL = process.env.REACT_APP_URL;
	const [owner, setOwner] = useState("");

	const subjectOwner = (ownerId) => {
		console.log(ownerId);
		axios.get(`${URL}users/${ownerId}`).then((res) => {
			setOwner(res.data[0].userName);
		});
	};
	useEffect(() => {
		if (subject.ownerId !== undefined) {
			subjectOwner(subject.ownerId);
		}
	}, []);

	return (
		<NavLink to={`/subject/${subject.id}`}>
			<div key={subject.id} className={styles.subjectContainer}>
				<h4 className={styles.titleHeader}>{subject.title}</h4>
				<NavLink to={`/subject/${subject.id}`}>
					<Button
						content="Enter"
						classnames={`${styles.joinBtn} ${styles.Btn}`}></Button>
				</NavLink>
				<h5 className={styles.subOwner}>User: {owner}</h5>
			</div>
		</NavLink>
	);
}

export default SubjectParticipant;
