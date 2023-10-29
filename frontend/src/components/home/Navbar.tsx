import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/main.css";
import LoginSignupModal from "../auth/Login";
import RegisterPage from "../auth/Register";
import FormModal from "../modalWrapper";
import { userContext } from "../../store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [navOpen, setNavOpen] = useState(false);
	// const [loginModal, setLoginModal] = useState(false);
	// const [registerModal, setRegisterModal] = useState(false);
	const { setIsLogged, isLogged, loginModal, setLoginModal, registerModal, setRegisterModal } = useContext(userContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLogged(true);
		}
	}, []);

	const toggleNav = () => {
		setNavOpen(!navOpen);
	};

	return (
		<header>
			<nav className="nav-logo">
				<h2 className="logo" style={{ cursor: "pointer" }}>
					<a href="/">DecaBLog</a>
				</h2>
				<ul className={`nav-links ${navOpen ? "responsive-nav" : ""}`}>
					{/* <li>
						<a href="/">Our story</a>
					</li>
					<li>
						<a href="/">Membership</a>
					</li> */}
					{isLogged &&(
					<li>
						<a href="/dashboard">Dashboard</a>
					</li>)}
					{isLogged && (
						<li>
							<a href="/write-blog">Write</a>
						</li>
					)}
					{isLogged && (
						<li>
							<a
								onClick={() => {
									localStorage.clear();
									setIsLogged(false);
									navigate("/");
								}}>
								Logout
							</a>
						</li>
					)}
					<li>{!isLogged && <a onClick={() => setLoginModal(true)}>Login</a>}</li>
					<li>
						<a onClick={() => setRegisterModal(true)}>Get started</a>
					</li>
					<button className="nav-btn nav-close-btn" onClick={toggleNav}>
						<FaTimes />
					</button>
				</ul>

				<button className="nav-dropdown" onClick={toggleNav}>
					<FaBars />
				</button>
			</nav>
			{loginModal && (
				<FormModal onClick={() => setLoginModal(false)}>
					<LoginSignupModal />
				</FormModal>
			)}
			{registerModal && (
				<FormModal onClick={() => setRegisterModal(false)}>
					<RegisterPage />
				</FormModal>
			)}
		</header>
	);
}
export default Navbar;
