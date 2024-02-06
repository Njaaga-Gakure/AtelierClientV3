import { toggleSidebar } from "../features/configuration/configurationSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import styled from "styled-components";
import Logo from "./Logo";
import { RxCross1 } from "react-icons/rx";
import NavLinks from "./NavLinks";
import { navLinks } from "../utils/data";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((store) => store.configuration);
  return (
    <Wrapper className={isSidebarOpen ? "sidebar sidebar--active" : "sidebar"}>
      <div className="sidebar__header">
        <Logo />
        <button
          onClick={() => dispatch(toggleSidebar(false))}
          className="close__btn"
        >
          <RxCross1 />
        </button>
      </div>
      <NavLinks navLinks={navLinks} />
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.aside`
  padding: 2rem;
  position: fixed;
  background-color: var(--gray-50);
  top: 0;
  left: 0;
  width: 50%;
  min-height: 100vh;
  z-index: 999;
  .logo__text {
    font-size: 1.25rem;
  }
  .sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
  .close__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border: none;
    font-size: 1.25rem;
    color: var(--red-danger);
  }
  .nav__links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .nav__link {
    text-transform: capitalize;
    letter-spacing: 3px;
    transition: var(--transition);
    &:hover {
      padding-left: 0.5rem;
    }
  }
  @media (min-width: 800px) {
    display: none;
  }
`;
