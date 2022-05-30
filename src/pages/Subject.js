import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useGesture } from "react-use-gesture";
import NewNote from "../components/NewNote";
import Note from "../components/Note";
import styles from "./Subject.module.scss";
import Users from "../components/Users";
import DownloadBtn from "../components/DownloadBtn";

function Subject() {
	let imageRef = useRef();
	let params = useParams();
	const nav = useNavigate();
	const { user } = useContext(UserContext);

	const data = localStorage.getItem("userData");
	const URL = process.env.REACT_APP_URL;
	const [subject, setSubject] = useState(null);
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);
	let [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
	const [mouse, setMouse] = useState("crosshair");
	const [noteTrue, setNoteTrue] = useState(false);
	const [color, setColor] = useState("#ffff88");

	// controls the overall board movement and zoom
	useGesture(
		{
			onDrag: ({ movement: [dx, dy] }) => {
				setCrop((crop) => ({ ...crop, x: dx, y: dy }));
			},
			onPinch: ({ memo, origin: [pinchOriginX, pinchOriginY], offset: [d] }) => {
				memo ??= {
					bounds: imageRef.current.getBoundingClientRect(),
					crop,
				};

				let transformOriginX = memo.bounds.x + memo.bounds.width / 2;
				let transformOriginY = memo.bounds.y + memo.bounds.height / 2;

				let displacementX = (transformOriginX - pinchOriginX) / memo.crop.scale;
				let displacementY = (transformOriginY - pinchOriginY) / memo.crop.scale;

				let initialOffsetDistance = (memo.crop.scale - 1) * 20000;
				let movementDistance = d - initialOffsetDistance;

				setCrop((crop) => ({
					...crop,
					scale: 1 + d / 20000,
					x: memo.crop.x + (displacementX * movementDistance) / 20000,
					y: memo.crop.y + (displacementY * movementDistance) / 20000,
				}));
				return memo;
			},
		},
		{
			drag: {
				initial: () => [crop.x, crop.y],
			},
			pinch: {
				distanceBounds: { min: -10000 },
			},
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
				setNoteTrue(true);
				setTimeout(() => {
					getNotes();
				}, 15000);
			})
			.catch((err) => setError(err));
	}

	useEffect(() => {
		if (user) {
			setColor(user.color);
		}
	}, [user]);

	// controls the zoom icon
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			e.ctrlKey && setMouse("zoom-in");
		});
		document.addEventListener("keyup", (e) => {
			!e.ctrlKey && setMouse("crosshair");
		});
	});

	// runs once subject has returned
	useEffect(() => {
		if (subject !== null) {
			getNotes();
		}
	}, [subject]);

	// runs first to get the subject
	useEffect(() => {
		getSubject();
	}, []);

	return (
		<div className={styles.outofbounds}>
			<Users color={color} />
			{subject !== null ? (
				<div>
					<h1 className={styles.subjectTitle}>Board: {subject.title}</h1>
					<DownloadBtn color={color} notes={notes} title={subject.title} />
				</div>
			) : (
				""
			)}
			<div
				className={styles.screenBackground}
				ref={imageRef}
				onMouseDown={() => setMouse("grabbing")}
				onMouseUp={() => setMouse("crosshair")}
				style={{
					left: crop.x,
					top: crop.y,
					touchAction: "none",
					transform: `scale(${crop.scale})`,
					cursor: mouse,
				}}>
				{subject !== null ? (
					<div>
						{noteTrue ? (
							<div>
								{/*  */}
								{notes.map((note) => {
									return (
										<Note
											content={note}
											scale={crop.scale}
											load={noteTrue}
											keyID={note.id}
										/>
									);
								})}
								{/*  */}
							</div>
						) : (
							<h3>Loading Notes...</h3>
						)}
					</div>
				) : (
					"Loading..."
				)}
			</div>
			{error && <h4>{error}</h4>}
			<NewNote passedColor={(value) => setColor(value)} />
		</div>
	);
}

export default Subject;
