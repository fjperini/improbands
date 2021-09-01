import { createContext } from "react";

const UserContext = createContext({
	user_email: null,
	hasLoginError: false,
	login: () => null,
	logout: () => null,
});

export default UserContext;
