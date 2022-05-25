import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserAuth } from "../helpers";
import Button from "../components/Button";
import { UserContext } from "../UserContext";



function SubjectForm() {
	function createSubject(e) {
		e.preventDefault();
	}

	return (
		<div>
			<form onSubmit={createSubject}>
				<input type="text" placeholder="Subject name..." />
				<input type="text" />
			</form>
		</div>
	);
}

export default SubjectForm;
