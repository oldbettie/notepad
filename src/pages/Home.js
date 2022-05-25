import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

function Home() {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (user != null) {
			setStatus(user.auth);
			setEmail(user.email);
		} else {
			setStatus(false);
		}
	}, [user]);

	return <h3>{status ? email : ""}</h3>;
}

export default Home;
