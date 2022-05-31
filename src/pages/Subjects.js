import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import SubjectForm from "../components/SubjectForm";
import Button from "../components/Button";
import Subject from "../components/Subject";
import styles from "../pages/Subjects.module.scss";
import SubjectParticipant from "../components/SubjectParticipant";
import NewSubject from "../components/NewSubject";

function Subjects() {
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [status, setStatus] = useState(false);
	const [newSubject, setNewSubject] = useState(true);
	const [ownSubjects, setOwnSubjects] = useState(["You have no subjects"]);
	const URL = process.env.REACT_APP_URL;
	const FRONT = process.env.FRONT;
	const [participation, setParticipation] = useState([
		"Currently not participating in other subjects",
	]);

	function checkForInvite() {
		const isInvite = window.localStorage.getItem("invite");
		if (isInvite) {
			//set User to subject
			const redirectUrl = `${FRONT}subject/${isInvite}`;
			localStorage.removeItem("invite");
			const userId = params.id;
			const subjectId = isInvite;
			const data = {
				userId: userId,
				subjectId: subjectId,
			};
			console.log("dataObject =", data);
			axios.post(`${URL}subjects/addUser`, data).then(() => {
				window.location.replace(redirectUrl);
			});
		} else {
			console.log("no invite");
		}
	}

	useEffect(() => {
		checkForInvite();
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
				setParticipation(userSubjects);
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
						{ownSubjects.map((subject) => {
							return <Subject subject={subject} key={subject.id} />;
						})}
					</div>
				</div>
				<div className={styles.subjectHolder}>
					<h3 className={styles.subjectsSubTitle}>Subjects you are part of</h3>
					<div className={styles.subjectsContainer}>
						{participation.map((subject) => {
							return (
								<SubjectParticipant subject={subject} key={subject.id} />
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Subjects;
