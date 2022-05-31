import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../components/Subject.module.scss";
import Button from "./Button";

function SubjectParticipant({ subject }) {
	return (
		<NavLink to={`/subject/${subject.id}`}>
			<div key={subject.id} className={styles.subjectContainer}>
				<h4 className={styles.titleHeader}>{subject.title}</h4>
				<NavLink to={`/subject/${subject.id}`}>
					<Button
						content="Enter"
						classnames={`${styles.joinBtn} ${styles.Btn}`}></Button>
				</NavLink>
			</div>
		</NavLink>
	);
}

export default SubjectParticipant;
