import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "../pages/Subjects.module.scss";

function SubjectParticipant({ subject }) {

	return (
		<div key={subject.id} className={styles.subjectsContainer}>
				<div>
					<span className={styles.subjectTitle}>
						{subject.title}
					</span>
					<NavLink to={`/subject/${subject.id}`}>
						<Button content="Join" />
					</NavLink>
				</div>
		</div>
	);
}

export default SubjectParticipant;