import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import styles from "./Profile.module.scss";
import Button from "../components/Button";

import EditProfile from "../components/EditProfile";
import Footer from "../components/Footer";

function Profile() {
	const { user } = useContext(UserContext);
	const [editStatus, setEditStatus] = useState(true);

	return (
		<div className={styles.background}>
			<div className={styles.formPadding}>
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
							{user.color && <h3>Color: {user.color}</h3>}
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Profile;
