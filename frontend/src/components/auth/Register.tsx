import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../store";
import { useContext } from "react";
import { toast } from "react-toastify";

const RegisterWrapper = styled.div`
	/* background: #f4f4f4; */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RegisterForm = styled.form`
	padding: 20px;
	border-radius: 10px;
	/* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); */
	text-align: center;
`;

const Title = styled.h2`
	font-size: 1.5rem;
	margin-bottom: 20px;
	color: #333;
`;

const InputField = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

const RegisterButton = styled.button`
	background: #007bff;
	color: white;
	padding: 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [phonenumber, setPhonenumber] = useState("");
	const [confirmpassword, setConfirmpassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const { setRegisterModal } = useContext(userContext);

	const handleRegister = () => {
		// Create an object with the user's registration data
		event?.preventDefault();
		const userData = {
			firstName,
			lastName,
			userName,
			password,
			phonenumber: phonenumber,
			email,
			confirmpassword,
		};

		// Send a POST request to your registration API
		fetch("/api/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then(() => {
				// Handle the response from the server
				console.log("Registration successful");
				toast.success("Registration successful");
				setRegisterModal(false);
				navigate("/");
			})
			.catch((error) => {
				// Handle network errors
				toast.error("Registration failed");
				console.error("Network error:", error);
			});
	};

	return (
		<RegisterWrapper>
			<RegisterForm>
				<Title>Register</Title>
				<InputField type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				<InputField type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				<InputField type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
				<InputField
					type="text"
					placeholder="Phone Number" // Added phone number input field
					value={phonenumber}
					onChange={(e) => setPhonenumber(e.target.value)}
				/>
				<InputField type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<InputField type="password" placeholder="confirm Password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
				<RegisterButton onClick={handleRegister}>Register</RegisterButton>
			</RegisterForm>
		</RegisterWrapper>
	);
};

export default RegisterPage;
