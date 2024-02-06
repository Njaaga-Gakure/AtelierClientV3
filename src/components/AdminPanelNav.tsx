import styled from "styled-components";
import { CiMenuBurger } from "react-icons/ci";
import AdminSearch from "./AdminSearch";
import { toggleAdminSidebar } from "../features/configuration/configurationSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RxCross1 } from "react-icons/rx";

const AdminPanelNav = () => {
  const { isAdminSidebarOpen } = useAppSelector((store) => store.configuration);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <p className="nav__welcome">
        Welcome, <span>{user?.name}</span>
      </p>
      <AdminSearch />
      <button
        onClick={() => dispatch(toggleAdminSidebar())}
        className="nav__toggle"
      >
        {isAdminSidebarOpen ? <RxCross1 /> : <CiMenuBurger />}
      </button>
    </Wrapper>
  );
};

export default AdminPanelNav;

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  background: var(--gray-50);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    color: var(--primary-500);
  }
  .nav__welcome {
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
    display: none;
    span {
      color: var(--primary-500);
      font-weight: 700;
    }
  }
  @media (min-width: 500px) {
    .nav__welcome {
      display: block;
    }
  }

  @media (min-width: 800px) {
    .nav__toggle {
      display: none;
    }
  }
`;
