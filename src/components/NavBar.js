import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import Button from "./Button";

function NavBar() {
	const { user, setUser } = useContext(UserContext);
	const [userState, setUserState] = useState(false);

	function logout() {
		localStorage.removeItem("userData");
	}

	useEffect(() => {
		if (user != null) {
			setUserState(user.auth);
		}
	}, [user]);

	return (
		<div className="navContainer">
			<div className="navDefault">
				<NavLink to={"/"}>
					<Button content="Home" classnames="btn btnNav" />
				</NavLink>
				<NavLink to={"/groups"}>
					<Button content="Groups" classnames="btn btnNav" />
				</NavLink>
			</div>

			{!userState ? (
				<div className="navUser">
					<NavLink to={"/login"}>
						<Button content="Login" classnames="btn btnNav" />
					</NavLink>
					<NavLink to={"/signup"}>
						<Button content="Sign Up" classnames="btn btnNav" />
					</NavLink>
				</div>
			) : (
				<div className="navUser">
					<Button content="Profile" classnames="btn btnNav" />
					<Button
						content="Sign Out"
						classnames="btn btnNav"
						onClick={logout}
					/>
				</div>
			)}
		</div>
	);
}

export default NavBar;
