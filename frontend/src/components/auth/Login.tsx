import { useNavigate } from "react-router-dom";
import { FormEvent, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { userContext } from "../../store";
import { useContext } from "react";
import { toast } from "react-toastify";

function Login() {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const { setIsLogged, setLoginModal } = useContext(userContext);

	const navigate = useNavigate();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const userName = usernameRef.current?.value;
		const password = passwordRef.current?.value;

		const userDetails = { userName, password };

		try {
			const response = await axios.post("/api/user/login", userDetails);
			// Handle the response, e.g., set user authentication state.
			console.log(response.data);
			toast.success("Login Successful");
			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				setIsLogged(true);
				navigate("/dashboard");
				setLoginModal(false);
			}
		} catch (error) {
			// Handle login failure, e.g., show an error message.
			toast.error("Login failed");
			console.error("Login failed", error);
		}
	};

	return (
		<RegisterWrapper>
			<RegisterForm>
				<Title>Login</Title>
				<InputField type="text" placeholder="Username" ref={usernameRef} />
				<InputField type="password" placeholder="Password" ref={passwordRef} />
				<RegisterButton type="button" onClick={handleSubmit}>
					Login
				</RegisterButton>
			</RegisterForm>
		</RegisterWrapper>
	);
}

const RegisterWrapper = styled.div`
	/* background: #f4f4f4; */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RegisterForm = styled.form`
	border-radius: 10px;
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

export default Login;
