import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Subjects from "./Subjects";
import Subject from "./Subject";

function Pages() {
	const location = useLocation();

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/user/:id" element={<Profile />} />
			<Route path="/subjects/:id" element={<Subjects />} />
			<Route path="/subject/:id" element={<Subject />} />
		</Routes>
	);
}

export default Pages;
