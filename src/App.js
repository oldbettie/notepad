import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import NavBar from "./components/NavBar";
import { UserContext } from "./UserContext";
import { useState, useMemo } from "react";

//  come back for auth provider stuff later
function App() {
	const [user, setUser] = useState(null);

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
