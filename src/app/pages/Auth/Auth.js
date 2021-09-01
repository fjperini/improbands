import React, { useState, useContext } from "react";
import UserContext from "../../contexts/userContext";
import { Form, Button } from "react-bootstrap";
import "./styles.css";

const Auth = () => {
	const { login, hasLoginError } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		login(username, password);
	};

	const onInputChange = (setter) => (e) => {
		setter(e.target.value);
	};

	function validateForm() {
		return username.length > 0 && password.length > 0;
	}

	return (
		<div className="Login">
			<Form onSubmit={onSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						autoFocus
						value={username}
						onChange={onInputChange(setUsername)}
						placeholder="impro@bands.com"
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
					{hasLoginError && (
						<div className="login-form-error">
							Login Failed: Incorrect Credentials
						</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={onInputChange(setPassword)}
						placeholder="password"
					/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={!validateForm()}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Auth;
