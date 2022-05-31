import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import NavBar from "./components/NavBar";
import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

//  come back for auth provider stuff later
function App() {
	const URL = process.env.REACT_APP_URL;
	// const URL = 'http://localhost:3000/'
	const [user, setUser] = useState(null);
	const data = localStorage.getItem("userData");

	function GetContext() {
		const userId = JSON.parse(data).id;
		const token = JSON.parse(data).token;
		axios
			.post(
				`${URL}isAuth`,
				//URL,
				{ id: userId },
				{
					headers: {
						"x-access-token": token,
					},
				}
			)
			.then((res) => {
				setUser(res.data);
			});
	}

	useEffect(() => {
		if (data) {
			GetContext();
		} else {
			setUser(null);
		}
	}, [data]);

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<NavBar />
				<Pages />
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
