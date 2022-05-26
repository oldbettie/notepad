import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Subjects.module.scss";
import SubjectForm from "../components/SubjectForm";
import SubjectEditForm from "../components/SubjectEditForm";
import Button from "../components/Button";

function Subjects() {
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [status, setStatus] = useState(false);
	const [edit, setEdit] = useState(true);
	const [newSubject, setNewSubject] = useState(true);
	const [ownSubjects, setOwnSubjects] = useState(["You have no subjects"]);
	const URL = `http://localhost:3000/`;

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
	}, []);

	function deleteSubject(id) {
		axios
			.delete(`${URL}subject/${id}`)
			.then(() => {
				console.log(`subject ${id} deleted`);
			})
			.then(window.location.reload());
	}

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
					return (
						<div key={subject.id} className={styles.subjectsContainer}>
							<h2>{subject.title}</h2>
							{edit ? (
								<div>
									<NavLink to={`/subject/${subject.id}`}>
										<Button content="Join" />
									</NavLink>
									<Button
										content="Edit"
										onClick={() => setEdit(!edit)}
									/>
									<Button
										content="Delete"
										onClick={() => deleteSubject(subject.id)}
									/>
								</div>
							) : (
								<SubjectEditForm id={subject.id} />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Subjects;
