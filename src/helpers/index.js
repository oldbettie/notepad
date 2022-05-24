import axios from "axios";

export function getUserAuth() {
	const URL = `http://localhost:3000/`;

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
