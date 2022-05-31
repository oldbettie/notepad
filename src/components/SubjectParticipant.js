import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../components/Subject.module.scss";

function SubjectParticipant({ subject }) {

	return (
		<NavLink to={`/subject/${subject.id}`}>
			<div key={subject.id} className={styles.subjectContainer}>
				
				<h4 className={styles.titleHeader}>
					{subject.title}
				</h4>
			</div>
		</NavLink>
	);
}

export default SubjectParticipant;