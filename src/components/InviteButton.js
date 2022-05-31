import React, { useState } from "react";

function InviteButton(props) {
	const URL = process.env.REACT_APP_URL;
	// const FRONT = "http://localhost:3001/";
	const FRONT = process.env.FRONT;
	const [createInvite, setCreateInvite] = useState(true);
	const [inviteLink, setInviteLink] = useState("");
	const subId = props.subjectId;
	const linkText = `${FRONT}subject/${subId}`;
	const [copyInvite, setCopyInvite] = useState("Copy Invite");

	function createLinkInvite() {
		setInviteLink(linkText);
		setCreateInvite(false);
	}

	const copyTextToClipboard = async () => {
		await navigator.clipboard.writeText(inviteLink);
		setCopyInvite("Copied to clipboard!");
		setTimeout(() => setCopyInvite("Copy Invite"), 2000);
	};

	return (
		<>
			{createInvite ? (
				<button onClick={() => createLinkInvite()}>Create Invite</button>
			) : (
				<span className="linkInvite">
					<button onClick={() => copyTextToClipboard()}>{copyInvite}</button>
				</span>
			)}
		</>
	);
}

export default InviteButton;
