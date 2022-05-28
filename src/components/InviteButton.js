import React, { useState, useContext, useEffect } from "react";


function InviteButton(props) {
	const URL = 'localhost:3001';
    const [createInvite, setCreateInvite] = useState(true);
    const [inviteLink, setInviteLink] = useState(''); 
    const linkText = `${URL}/?subject=${props.subjectId}&owner=${props.userId}`;
    
    function createLinkInvite() {
        setInviteLink(linkText);
        setCreateInvite(false);
    }


    const copyTextToClipboard = async () => {
        await navigator.clipboard.writeText(inviteLink);
        console.log('Text copied');
    }

	return (
        <>
            { createInvite ? (
                <button onClick={() => createLinkInvite()}>
                    Create Invite
                </button>
            ) : (
                <span className="linkInvite">
                <button onClick={() => copyTextToClipboard()}>Copy</button>
                    {inviteLink} 
                </span>
            )}
        </>
    )
}

export default InviteButton;