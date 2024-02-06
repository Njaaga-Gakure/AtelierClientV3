import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdDashboard, MdGroups } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdAssignmentAdd } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/user/userSlice";

const AdminSidebar = () => {
  const { isAdminSidebarOpen } = useAppSelector((store) => store.configuration);
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <aside
        className={isAdminSidebarOpen ? "sidebar sidebar--open" : "sidebar"}
      >
        <div className="logo">
          <Link to="/admin-panel" className="logo__icon">
            A
          </Link>
        </div>
        <ul className="sidebar__links">
          <li className="sidebar__link">
            <Link className="sidebar__anchor" to="/admin-panel">
              <MdDashboard />
              dashboard
            </Link>
          </li>
          <li className="sidebar__link">
            <Link className="sidebar__anchor" to="/admin-panel/users">
              <MdGroups />
              manage users
            </Link>
          </li>
          <li className="sidebar__link">
            <Link className="sidebar__anchor" to="/admin-panel/products">
              <FaBoxOpen />
              manage products
            </Link>
          </li>
          <li className="sidebar__link">
            <Link className="sidebar__anchor" to="/admin-panel/view-categories">
              <HiDocumentDuplicate />
              view categories
            </Link>
          </li>
          <li className="sidebar__link">
            <Link className="sidebar__anchor" to="/admin-panel/add-categories">
              <MdAssignmentAdd />
              add category
            </Link>
          </li>
        </ul>
        <ul className="sidebar__links">
          <li className="sidebar__link">
            <button
              onClick={() => dispatch(logout())}
              className="sidebar__anchor sidebar__logout"
            >
              <CiLogout />
              logout
            </button>
          </li>
        </ul>
      </aside>
    </Wrapper>
  );
};

export default AdminSidebar;

const Wrapper = styled.div`
  svg {
    font-size: 1.7rem;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--gray-50);
    width: 60px;
    z-index: 2000;
    overflow-x: hidden;
    scrollbar-width: none;
    transition: var(--transition);
    transform: translateX(-100%);
  }

  .sidebar::-webkit-scrollbar {
    display: none;
  }

  .sidebar--open {
    width: 230px;
    transform: translateX(0);
  }

  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-700);
    color: var(--primary-100);
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 1rem auto;
  }
  .sidebar__links {
    width: 100%;
    margin-top: 4rem;
  }
  .sidebar__link {
    height: 3rem;
    margin-left: 6px;
    padding: 4px;
    padding-right: 0;
  }

  .sidebar__link--active {
    background-color: var(--white);
    position: relative;
  }

  .sidebar__anchor {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing-1);
    width: 100%;
    width: calc(48px - (4px * 2));
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 48px;
    font-size: 16px;
    color: var(--primary-700);
    white-space: nowrap;
    overflow-x: hidden;
    transition: var(--transition);
  }
  .sidebar--open .sidebar__anchor {
    width: 100%;
  }

  .sidebar__link--active .sidebar__anchor {
    color: var(--primary-500);
  }

  .sidebar--close .sidebar__anchor {
    width: calc(48px - (4px * 2));
    transition: var(--transition);
  }
  .sidebar__link svg {
    min-width: calc(60px - ((4px + 6px) * 2));
    display: flex;
    font-size: 1.6rem;
    justify-content: center;
  }
  .sidebar__logout {
    background-color: transparent;
    border: none;
  }
  @media (min-width: 500px) {
    .sidebar {
      transform: translateX(0);
    }
  }

  @media (min-width: 800px) {
    .sidebar {
      width: 230px;
    }
    .sidebar__anchor {
      width: 100%;
    }
  }
`;
