import { IoLogoTwitter } from "react-icons/io5";
import { FaInstagramSquare } from "react-icons/fa";
import { RiSnapchatFill } from "react-icons/ri";
import styled from "styled-components";
const SocialLinks = () => {
  return (
    <Wrapper>
      <a
        href="#"
        className="social__link"
        target="_blank"
        rel="noreferrer noopener"
      >
        <IoLogoTwitter />
      </a>
      <a
        href="#"
        className="social__link"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FaInstagramSquare />
      </a>
      <a
        href="#"
        className="social__link"
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiSnapchatFill />
      </a>
    </Wrapper>
  );
};

export default SocialLinks;

const Wrapper = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .social__link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-300);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid var(--primary-300);
    transition: var(--transition);
    &:hover {
      color: var(--white);
      background-color: var(--primary-300);
    }
  }
`;
