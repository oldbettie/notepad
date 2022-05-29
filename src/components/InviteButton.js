import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


function InviteButton(props) {
	const URL = process.env.REACT_APP_URL;
    const [createInvite, setCreateInvite] = useState(true);
    const [inviteLink, setInviteLink] = useState('');
    const linkText = `${URL}/subject/${props.subjectId}`;
    const [copyInvite, setCopyInvite] = useState('Copy Invite');
    
    function createLinkInvite() {
        setInviteLink(linkText);
        setCreateInvite(false);
    }


    const copyTextToClipboard = async () => {
        await navigator.clipboard.writeText(inviteLink);
        console.log('Text copied');
        setCopyInvite('Copied to clipboard!');
        setTimeout(()=> setCopyInvite('Copy Invite'), 2000);
    }

	return (
        <>
            { createInvite ? (
                <button onClick={() => createLinkInvite()}>
                    Create Invite
                </button>
            ) : (
                <span className="linkInvite">
                <button onClick={() => copyTextToClipboard()}>{copyInvite}</button> 
                </span>
            )}
        </>
    )
}

export default InviteButton;
