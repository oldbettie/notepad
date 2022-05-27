import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGesture } from "react-use-gesture";
import NewNote from "../components/NewNote";
import Note from "../components/Note";
import styles from "./Subject.module.scss";

function Subject() {
	let imageRef = useRef();
	let params = useParams();
	const nav = useNavigate();
	const data = localStorage.getItem("userData");
	const URL = process.env.REACT_APP_URL;
	const [subject, setSubject] = useState(null);
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);
	let [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });

	useGesture(
		{
			onDrag: ({ offset: [dx, dy] }) => {
				setCrop((crop) => ({ ...crop, x: dx, y: dy }));
			},
			onPinch: ({ offset: [d] }) => {
				setCrop((crop) => ({ ...crop, scale: 1 + d / 20000 }));
			},
		},
		{
			domTarget: imageRef,
			eventOptions: { passive: false },
		}
	);

	function getSubject() {
		if (!data) {
			nav("/login");
		} else {
			axios.get(`${URL}subject/${params.id}`).then((res) => {
				setSubject(res.data[0]);
			});
		}
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
		<div className={styles.outofbounds}>
			<div
				className={styles.screenBackground}
				ref={imageRef}
				style={{
					left: crop.x,
					top: crop.y,
					touchAction: "none",
					transform: `scale(${crop.scale})`,
				}}>
				{subject !== null ? (
					<div>
						<h1>{subject.title}</h1>
						<div>
							{/*  */}
							{/*  */}
							{notes.map((note) => {
								return <Note content={note} />;
							})}
							{/*  */}
							{/*  */}
						</div>
					</div>
				) : (
					"Loading..."
				)}
			</div>
			<NewNote />
		</div>
	);
}

export default Subject;
