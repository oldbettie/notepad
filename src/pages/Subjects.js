import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import SubjectForm from "../components/SubjectForm";
import Subject from "../components/Subject";
import styles from "../pages/Subjects.module.scss";
import SubjectParticipant from "../components/SubjectParticipant";
import NewSubject from "../components/NewSubject";

function Subjects() {
	let params = useParams();
	const { user } = useContext(UserContext);
	const [status, setStatus] = useState(false);
	const [newSubject, setNewSubject] = useState(true);
	const [ownSubjects, setOwnSubjects] = useState(["You have no subjects"]);
	const URL = process.env.REACT_APP_URL;
	const FRONT = process.env.FRONT;
	const [participation, setParticipation] = useState([
		"Currently not participating in other subjects",
	]);

	useEffect(() => {
		// checkForInvite();
		getAllSubjects();
	}, []);

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

	// this is subjects user has joined not owner!
	function getAllSubjects() {
		const userSubjects = [];
		let thisUser = parseInt(params.id);
		axios
			.get(`${URL}subjects/all`)
			.then((res) => {
				return res.data;
			})
			.then((allSubjects) => {
				for (let i = 0; i < allSubjects.length; i++) {
					if (allSubjects[i].users.length > 0) {
						for (let j = 0; j < allSubjects[i].users.length; j++) {
							let subjectUserId = allSubjects[i].users[j].id;
							if (subjectUserId === thisUser) {
								userSubjects.push(allSubjects[i]);
							}
						}
					}
				}
				const filteredSubjects = userSubjects.filter((userlist) => {
					return userlist.ownerId !== user.id;
				});
				setParticipation(filteredSubjects);
			});
	}

	return (
		<div className={styles.subjectsMain}>
			<h2 className={styles.subjectsTitle}>Your Subjects</h2>
			<div>
				<div className={styles.subjectHolder}>
					<div className={styles.subjectsContainer}>
						{status && (
							<>
								{newSubject ? (
									<NewSubject onClick={writeSubject} />
								) : (
									<SubjectForm />
								)}
							</>
						)}
						{ownSubjects.map((subject, index) => {
							return <Subject subject={subject} key={index} />;
						})}
					</div>
				</div>
				<div className={styles.subjectHolder}>
					<h3 className={styles.subjectsSubTitle}>Subjects you have joined</h3>
					<div className={styles.subjectsContainer}>
						{participation.map((subject) => {
							return (
								<SubjectParticipant
									subject={subject}
									ownerId={subject.ownerId}
									key={subject.id}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Subjects;
