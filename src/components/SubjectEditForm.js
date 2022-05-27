import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";

function SubjectEditForm({ id }) {
	let params = useParams();
	const nav = useNavigate();
	const data = localStorage.getItem("userData");
	const token = JSON.parse(data).token;
	const URL = process.env.REACT_APP_URL;
	const { user, setUser } = useContext(UserContext);
	const [title, setTitle] = useState("");

	function updateSubject(e) {
		e.preventDefault();
		axios
			.put(
				`${URL}/subject/${id}`,
				{
					title,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				console.log(res);
				window.location.reload();
			});
	}
	return (
		<div>
			<form onSubmit={updateSubject}>
				<input
					type="text"
					placeholder="Subject name..."
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<button type="submit">Update Subject</button>
			</form>
		</div>
	);
}

export default SubjectEditForm;
