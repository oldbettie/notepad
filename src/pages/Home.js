import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

function Home() {
	const { user, setUser } = useContext(UserContext);
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (user != null) {
			setStatus(user.auth);
		}
	}, [user]);

	return <h3>{status && user.email}</h3>;
}

export default Home;
