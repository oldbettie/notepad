import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import NewNote from "../components/NewNote";
import Note from "../components/Note";
import styles from "./Subject.module.scss";

function Subject() {
	let params = useParams();
	const URL = `http://localhost:3000/`;
	const [subject, setSubject] = useState(null);
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);

	// not returning username just the id
	function getSubject() {
		axios.get(`${URL}subject/${params.id}`).then((res) => {
			setSubject(res.data[0]);
		});
	}

	function getNotes() {
		axios
			.get(`${URL}notes/${subject.id}`)
			.then((res) => {
				setNotes(res.data);
			})
			.catch((err) => setError(err));
	}

	useEffect(() => {
		if (subject !== null) {
			getNotes();
		}
	}, [subject]);

	useEffect(() => {
		getSubject();
	}, []);
	return (
		<div>
			{subject !== null ? (
				<div>
					<h1>{subject.title}</h1>
					<div>
						<h1>this is the main board</h1>

						{/*  */}
						{/*  */}
						{notes.map((note, index) => {
							return <Note content={note} />;
						})}
						{/*  */}
						{/*  */}
						<NewNote />
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</div>
	);
}

export default Subject;
