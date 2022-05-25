import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styles from "./Profile.module.scss";
import Button from "../components/Button";

import EditProfile from "../components/EditProfile";

function Profile() {
	const { user, setUser } = useContext(UserContext);
	const [editStatus, setEditStatus] = useState(true);

	return (
		<div className={styles.profileContainer}>
			{editStatus ? (
				<div className={styles.subHeader}>
					<h2>My Profile</h2>
					<Button
						content="Edit Profile"
						onClick={() => setEditStatus(!editStatus)}
					/>
				</div>
			) : (
				<EditProfile context={user} />
			)}
			<hr />
			{user && (
				<div className={styles.userData}>
					<h3>Username: {user.userName}</h3>
					{user.firstName && <h3>First name: {user.firstName}</h3>}
					{user.lastName && <h3>Last name: {user.lastName}</h3>}
					{user.email && <h3>Email: {user.email}</h3>}
				</div>
			)}
		</div>
	);
}

export default Profile;
