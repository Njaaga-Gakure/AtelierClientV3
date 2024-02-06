import styled from "styled-components";

const Logo = () => {
  return (
    <Wrapper className="logo">
      <h3 className="logo__text">
        <span>Atel</span>ier
      </h3>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  .logo__text {
    letter-spacing: var(--letter-spacing-1);
    color: var(--gray-600);
    span {
      font-weight: 700;
      color: var(--primary-500);
    }
  }
`;
