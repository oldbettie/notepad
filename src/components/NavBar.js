import React, { useContext, useEffect, useState } from "react";
import { GrHome } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Button from "./Button";

function NavBar() {
	const nav = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const [userState, setUserState] = useState(false);
	const [navState, setNavState] = useState(false);

	useEffect(() => {
		if (window.location.href.includes("/subject/")) {
			setNavState(true);
		} else {
			setNavState(false);
		}
	}, [window.location.href]);

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
		<div
			className="navContainer"
			style={
				navState
					? {
							position: "fixed",
							background: "white",
							opacity: "0.8",
							width: "100%",
					  }
					: { position: "sticky" }
			}>
			<div>
				<div className="navDefault">
					{userState ? (
						<NavLink to={`/subjects/${user.id}`}>
							<Button
								content={<GrHome />}
								classnames="btn btnNav btnHome"
							/>
						</NavLink>
					) : (
						<NavLink to={"/"}>
							<Button
								content={<GrHome />}
								classnames="btn btnNav btnHome"
							/>
						</NavLink>
					)}
				</div>

				{!userState ? (
					<div className="navUser">
						<NavLink to={"/login"}>
							<Button content="Login" classnames="btn btnNav btnLogin" />
						</NavLink>
					</div>
				) : (
					<div className="navUser">
						<NavLink to={`/user/${user.id}`}>
							<Button
								content={<CgProfile />}
								classnames="btn btnNav btnHome"
							/>
						</NavLink>
						<NavLink to={"/"}>
							<Button
								content={<VscSignOut />}
								classnames="btn btnNav btnHome"
								onClick={logout}
							/>
						</NavLink>
					</div>
				)}
			</div>
		</div>
	);
}

export default NavBar;
