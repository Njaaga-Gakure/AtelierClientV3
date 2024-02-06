import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSidebar } from "../features/configuration/configurationSlice";
import { logout } from "../features/user/userSlice";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import { navLinks } from "../utils/data";
import { CiMenuBurger, CiLogout, CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

const Navbar = () => {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
  let name: string = "";
  if (user) {
    name = user.name.split(" ")[0];
  }

  const { bidCount } = useAppSelector((store) => store.bid);
  return (
    <Wrapper>
      <div className="content--center nav--center">
        <Logo />
        <NavLinks navLinks={navLinks} />
        <button
          onClick={() => dispatch(toggleSidebar(true))}
          className="nav__toggle"
        >
          <CiMenuBurger />
        </button>
        <div className="nav__profile">
          <NavLink className="nav__cart" to="/cart">
            <CiShoppingCart /> <span>{bidCount}</span>
          </NavLink>
          <div className="nav__auth">
            <button
              onClick={() => setIsLogout(!isLogout)}
              className="nav__avatar"
            >
              <CiUser />
              {name}
            </button>
            {isLogout && (
              <button
                onClick={() => dispatch(logout())}
                className="btn nav__logout"
              >
                <CiLogout />
                logout
              </button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  height: 4rem;
  display: flex;
  align-items: center;
  .nav--center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid black; */
  }

  .nav__profile {
    display: none;
  }
  .nav__toggle {
    background: transparent;
    display: flex;
    align-items: center;
    border: none;
    font-size: 1.5rem;
    color: var(--primary-500);
  }
  @media (min-width: 800px) {
    .nav__toggle {
      display: none;
    }
    .nav__profile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .nav__cart {
      font-size: 2rem;
      position: relative;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -1px;
        right: -8px;
        font-size: 15px;
        background: var(--primary-500);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        color: var(--white);
        font-weight: 700;
      }
    }
    .nav__auth {
      position: relative;
    }
    .nav__avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      border: none;
      letter-spacing: var(--letter-spacing-1);
      font-size: 1.25rem;
      svg {
        font-size: 1.5rem;
      }
    }
    .nav__logout {
      position: absolute;
      bottom: -3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      gap: 0.5rem;
    }
  }
`;
