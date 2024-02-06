import { Outlet } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "../components";
import styled from "styled-components";
const SharedLayouts = () => {
  return (
    <Wrapper className="container">
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default SharedLayouts;

const Wrapper = styled.div`
  .sidebar {
    transition: var(--transition);
    transform: translateX(-100%);
  }
  .sidebar--active {
    transform: translateX(0);
  }
`;
