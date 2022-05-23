import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

function Pages() {
	const location = useLocation();

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	);
}

export default Pages;
