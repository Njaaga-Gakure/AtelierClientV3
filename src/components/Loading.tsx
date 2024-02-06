import styled from "styled-components";
const Loading = () => {
  return <Wrapper className="spinner"></Wrapper>;
};

export default Loading;

const Wrapper = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--black);
  border-top: 2px solid var(--primary-100);
  animation: spin 0.3s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
