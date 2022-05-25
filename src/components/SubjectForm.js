import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";



function SubjectForm() {
	const nav = useNavigate();
	const URL = `http://localhost:3000`;
	const { user, setUser } = useContext(UserContext);
	const [title, setTitle] = useState('');
	
	function createSubject(e) {
		e.preventDefault();
		axios
		.post(`${URL}/subjects/${user.id}/new`, {
			title,
			ownerId : user.id
		})
		.then(() => {
			nav(`subjects/${user.id}`);
		})
	}
	return (
		<div>
			<form onSubmit={createSubject}>
				<input type="text" placeholder="Subject name..." 
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<button type="submit">Add Subject</button>
			</form>
		</div>
	);
}

export default SubjectForm;
