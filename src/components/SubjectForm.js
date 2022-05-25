import React from "react";

function SubjectForm() {
	function createSubject() {}

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
