import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Button from "../components/Button";

function NewNote() {
	let params = useParams();
	const { user, setUser } = useContext(UserContext);
	const [note, setNote] = useState(null);

	function submitNote(e) {
		const data = localStorage.getItem("userData");
		const token = JSON.parse(data).token;
		const URL = `http://localhost:3000/notes/new`;

		e.preventDefault();
		axios
			.post(
				URL,
				{
					note_text: note,
					x_axis: 400,
					y_axis: 400,
					subjectId: params.id,
					userId: user.id,
				},
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				setNote("");
			}).catch(error){
                console.log(error);
            }
	}

	return (
		<div>
			<form onSubmit={submitNote}>
				<input
					type="text"
					placeholder="content..."
					onChange={(e) => {
						setNote(e.target.value);
					}}
				/>
			</form>
		</div>
	);
}

export default NewNote;
