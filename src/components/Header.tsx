import { type FC } from "react";
import styled from "styled-components";

type HeaderProps = {
  title: string;
  description: string;
};

const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <Wrapper>
      <h5 className="header__title">{title}</h5>
      <p className="header__description">{description}</p>
      <div className="recent__artworks"></div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  border-left: 5px solid var(--primary-500);
  padding-left: 1rem;
  .header__title {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing-2);
    font-weight: 700;
    color: var(--primary-500);
  }
  .header__description {
    color: var(--gray-500);
    letter-spacing: var(--letter-spacing-1);
  }
`;
