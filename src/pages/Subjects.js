import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Subjects.module.scss";
import SubjectForm from "../components/SubjectForm";
import SubjectEditForm from "../components/SubjectEditForm";
import Button from "../components/Button";
import Subject from "../components/Subject";

function Subjects() {
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [status, setStatus] = useState(false);
	const [newSubject, setNewSubject] = useState(true);
	const [ownSubjects, setOwnSubjects] = useState(["You have no subjects"]);
	const URL = process.env.REACT_APP_URL;

	function writeSubject() {
		setNewSubject(!newSubject);
	}

	useEffect(() => {
		if (user != null) {
			setStatus(user.auth);
			if (user.auth) {
				setNewSubject(true);
			}
		} else {
			setStatus(false);
		}
	}, [user]);

	function getSubjects() {
		axios.get(`${URL}subjects/${params.id}`).then((res) => {
			const subjects = res.data;
			setOwnSubjects(subjects);
		});
	}
	useEffect(() => {
		getSubjects();
	}, [status]);

	return (
		<div>
			<h2>Welcome to your Subjects</h2>
			{status && (
				<>
					{newSubject ? (
						<Button content="NewSubject" onClick={writeSubject} />
					) : (
						<SubjectForm />
					)}
				</>
			)}
			<div>
				<h3>Created subjects</h3>
				{ownSubjects.map((subject) => {
					return <Subject subject={subject} />;
				})}
			</div>
		</div>
	);
}

export default Subjects;
