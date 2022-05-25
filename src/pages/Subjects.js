import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import SubjectForm from "../components/SubjectForm";
import Button from "../components/Button";
import axios from "axios";

function Subjects() {
	const { user, setUser } = useContext(UserContext);
	const [status, setStatus] = useState(false);
	const [newSubject, setNewSubject] = useState(true);
	const [ownSubjects, setOwnSubjects] = useState(['You have no subjects']);
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

	useEffect(() => {
		getSubjects()
	}, [])

	function getSubjects() {
		axios
			.get(`${URL}subjects/${user.id}`)
		.then((res) => {
			const subjects = res.data;
			console.log(subjects);	//Im not rendering the list properly but the route works
			setOwnSubjects(subjects);
			console.log(ownSubjects);
		});
	}

	function getOneSubject() {
		const subjectId = 1; //just to test
		axios
			.get(`${URL}subject/${subjectId}`)
			.then((res) => {
				const subject = res.data[0];
				console.log(subject.title);
	});

	}

	function deleteSubject() {
		const subjectId = 5;
		axios
			.delete(`${URL}subject/${subjectId}`)
			.then(()=> {
				console.log(`subject ${subjectId} deleted`);
			})
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
					<ul>
						{ownSubjects.map(subject => {
							<li>{subject.title}</li>
						})}
					</ul>
				</div>
				<div>
					<button onClick={getOneSubject}>test get 1 subject</button>
					<button onClick={deleteSubject}>test delete 1 subject</button>
				</div>
		</div>

	);
}

export default Subjects;
