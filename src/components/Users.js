import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import styles from "./Users.module.scss";

function Users({ userList }) {
	let params = useParams();
	const [open, setOpen] = useState(false);
	const [userCount, setUserCount] = useState(0);
	const [users, setUsers] = useState([{}]);
	const [copied, setCopied] = useState(0);

	useEffect(() => {
		setUserCount(users.length);
	}, [users]);

	useEffect(() => {
		setUsers(userList);
	}, [userList]);

	function copyClipboard() {
		setCopied(1);
		navigator.clipboard.writeText(
			`https://noteteams.netlify.app/subject/${params.id}`
		);
		setTimeout(() => {
			setCopied(0);
		}, 3000);
	}

	return (
		<div
			className={styles.userContainer}
			onClick={() => setOpen(!open)}
			style={
				!open
					? { width: "40px", height: "40px" }
					: { width: "180px", height: `${40 * userCount}px` }
			}>
			<div className={styles.copiedLink} style={{ opacity: copied }}>
				<h4>Link copied!</h4>
			</div>

			{!open ? (
				<div className={styles.userContentContainer}>
					<FiUsers />
				</div>
			) : (
				<div
					className={styles.userContentContainerOpen}
					style={{ height: `${40 * userCount}px` }}>
					<div className={styles.allUsersContainer}>
						{users.map((user, index) => {
							return (
								<div className={styles.usersBox} key={index}>
									<h6>{user.userName}</h6>
									<FiUsers />
								</div>
							);
						})}
						<div className={styles.inviteContainer} onClick={copyClipboard}>
							<h4 className={styles.inviteBtn}>Invite</h4>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Users;
