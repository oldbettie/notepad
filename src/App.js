import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import NavBar from "./components/NavBar";

//  come back for auth provider stuff later
function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Pages />
		</BrowserRouter>
	);
}

export default App;
