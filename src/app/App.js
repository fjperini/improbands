import React, { useReducer } from "react";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import Bands from "./pages/Bands/Bands";
import UserContext from "./contexts/userContext";
import Auth from "./pages/Auth/Auth";

const user = "impro@bands.com";
const user_password = "password";

const initial_state = {
	user: null,
	hasLoginError: false,
};

const validate = (username, password) =>
	username === user && password === user_password;

const reducer = (state, action) => {
	switch (action.type) {
		case "login": {
			const { username, password } = action.payload;

			if (!validate(username, password)) {
				return {
					...state,
					hasLoginError: true,
					user: null,
				};
			}

			return {
				...state,
				hasLoginError: false,
				user: {
					id: 1,
					username: user,
				},
			};
		}
		case "logout":
			return {
				...state,
				user: null,
			};
		default:
			throw new Error(`Invalid action type: ${action.type}`);
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initial_state);

	const currentValue = {
		user: state.user,
		hasLoginError: state.hasLoginError,
		login: (username, password) =>
			dispatch({
				type: "login",
				payload: { username, password },
			}),
		logout: () => dispatch({ type: "logout" }),
	};
	return (
		<UserContext.Provider value={currentValue}>
			{state.user && (
				<>
					<Header />
					<Bands />
					<Footer />
				</>
			)}
			{!state.user && <Auth />}
		</UserContext.Provider>
	);
};

export default App;
