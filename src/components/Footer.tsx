import styled from "styled-components";
import NavLinks from "./NavLinks";
import { navLinks } from "../utils/data";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer--center content--center">
        <NavLinks navLinks={navLinks} />
        <SocialLinks />
        <p className="footer__copy-right">
          &copy; all rights reserved {new Date().getFullYear()}
        </p>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: var(--primary-100);
  .nav__links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .nav__link {
    letter-spacing: var(--letter-spacing-1);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  .nav__link--active {
    color: var(--primary-500);
  }
  .footer__copy-right {
    margin-top: 1rem;
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    color: var(--gray-500);
  }
`;
