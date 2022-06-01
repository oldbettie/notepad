import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { FiUsers } from "react-icons/fi";
import { UserContext } from "../UserContext";
import styles from "./Users.module.scss";

function Users({ userList }) {
	let params = useParams();

	const { user } = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const [userCount, setUserCount] = useState(0);
	const [users, setUsers] = useState([
		{ userName: "bob" },
		{ userName: "sarah" },
		{ userName: "timmy" },
	]);
	useEffect(() => {
		setUserCount(users.length);
	}, []);

	useEffect(() => {
		setUsers(userList);
	}, [userList]);

	return (
		<div
			className={styles.userContainer}
			onClick={() => setOpen(!open)}
			style={
				!open
					? { width: "40px", height: "40px" }
					: { width: "180px", height: `${40 * userCount + 10}px` }
			}>
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
						<div
							className={styles.inviteContainer}
							onClick={() =>
								navigator.clipboard.writeText(
									`https://noteteams.netlify.app/subject/${params.id}`
								)
							}>
							<h4 className={styles.inviteBtn}>Invite</h4>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Users;
