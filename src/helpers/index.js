import axios from "axios";

// pretty sure this entire file is redundent
export function getUserAuth() {
	//const URL = process.env.REACT_APP_URL;
	const URL = 'http://localhost:3000/'

	axios
		.get(`${URL}isAuth`, {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		})
		.then((res) => {
			console.log(res);
			return res.data.auth;
		});
}
