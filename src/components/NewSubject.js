import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "./Button";
import styles from "./NewSubject.module.scss";

function NewSubject({ onClick }) {
	return (
		<div className={styles.subjectContainer} onClick={onClick}>
			<h4>New Subject</h4>
			<Button content={<AiFillPlusCircle />} classnames={styles.newNoteBtn} />
		</div>
	);
}

export default NewSubject;
