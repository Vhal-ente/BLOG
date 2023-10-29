// App.tsx
import React, { useState } from "react";
import Navbar from "./components/home/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./components/userBlogPage/userPage";
import WriteBlog from "./components/blog/writeBlog";
import { userContext } from "./store";
import Dashboard from "./pages/Dashboard";
import UserBlogDetail from "./components/userBlogPage/userPostPage";
import Layout from "./components/home/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [loginModal, setLoginModal] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);
	return (
		<userContext.Provider value={{ isLogged, setIsLogged, loginModal, setLoginModal, registerModal, setRegisterModal }}>
			<Navbar />
			<ToastContainer />
			<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/detail/:id" element={<BlogDetail />} />
				<Route path="/post-detail/:id" element={<UserBlogDetail />} />
				<Route path="/write-blog/" element={<WriteBlog />} />
			</Routes>
			</Layout>
		</userContext.Provider>
	);
}

export default App;
