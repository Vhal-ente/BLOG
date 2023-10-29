// import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


// import LoginSignupModal from "../auth/Login";

interface NavbarProps {
  // Define any props you might need
}

const NavbarContainer = styled.nav`
  background-color: #29335c;
  padding: 20px;
  font-size: larger;
  margin-top: 0px;
`;



const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

const NavItem = styled.li`
	margin: 0;
	text-decoration: none;
	color: #f8f5f5;

`;

// const NavLink = styled.Link`
//   text-decoration: none;
//   color: white;
// `;

const Dashbar: React.FC<NavbarProps> = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

// 	const closeModal = () => {
// 		setIsModalOpen(false);
// 	};
	return (
    <NavbarContainer>
			<NavList>
				
        <NavItem >
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
					</NavItem>
					
        {/* <NavItem>
					<Link to="/about" style={{ textDecoration: "none" }}>
						About
					</Link>
				</NavItem> */}
        {/* <NavItem>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
        </NavItem> */}
        <NavItem>
          <Link to="/" style={{ textDecoration: "none" }}>
            Logout
          </Link>
        </NavItem>
        {/* <NavItem>
					<button onClick={openModal}>Open Modal</button>
					{isModalOpen && <LoginSignupModal onClose={closeModal} />}
				</NavItem> */}
      </NavList>
    </NavbarContainer>
  );
};

export default Dashbar;
