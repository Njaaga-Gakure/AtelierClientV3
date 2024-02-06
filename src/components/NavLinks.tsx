import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSidebar } from "../features/configuration/configurationSlice";
import { type FC } from "react";
import { navLink } from "../utils/data";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type NavLinkProps = {
  navLinks: navLink[];
};

const NavLinks: FC<NavLinkProps> = ({ navLinks }) => {
  const { user } = useAppSelector((store) => store.user);
  let role: string;
  if (user) {
    role = user.role;
  }
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <div className="nav__links">
        {navLinks.map(({ id, link, path }) => {
          return role != "seller" && link === "my auctions" ? null : (
            <NavLink
              onClick={() => dispatch(toggleSidebar(false))}
              className="nav__link"
              key={id}
              to={path}
            >
              {link}
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default NavLinks;

const Wrapper = styled.ul`
  .nav__links {
    display: none;
  }
  @media (min-width: 800px) {
    .nav__links {
      display: flex;
      gap: 1rem;
    }
    .nav__link {
      letter-spacing: var(--letter-spacing-1);
      text-transform: capitalize;
    }
    .nav__link--active {
      color: var(--primary-500);
    }
  }
`;
