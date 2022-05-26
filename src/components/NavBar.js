import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Button from "./Button";

function NavBar() {
	const nav = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const [userState, setUserState] = useState(false);

	function logout() {
		localStorage.removeItem("userData");
		setUser(null);
		setUserState(false);
		nav("/");
	}

	useEffect(() => {
		if (user != null) {
			setUserState(user.auth);
		} else {
			setUserState(false);
		}
	}, [user]);

	return (
		<div className="navContainer">
			<div>
				<div className="navDefault">
					<NavLink to={"/"}>
						<Button content="Home" classnames="btn btnNav" />
					</NavLink>
					{userState ? (
						<NavLink to={`/subjects/${user.id}`}>
							<Button content="Subjects" classnames="btn btnNav" />
						</NavLink>
					) : (
						""
					)}
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
						<NavLink to={`/user/${user.id}`}>
							<Button content="Profile" classnames="btn btnNav" />
						</NavLink>
						<Button
							content="Sign Out"
							classnames="btn btnNav"
							onClick={logout}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default NavBar;
