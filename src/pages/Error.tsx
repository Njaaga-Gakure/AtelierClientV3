import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Error = () => {
  const { user } = useAppSelector((store) => store.user);
  let role: string = "";
  if (user) {
    role = user.role;
  }
  return (
    <Wrapper>
      <div className="error__info">
        <h5 className="error__title">
          <span>404: </span>
          The page you are looking for could not be found :(
        </h5>
        <Link
          to={role === "admin" ? "/admin-panel" : "/"}
          className="btn btn--secondary"
        >
          back home
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--primary-100);
  text-align: center;
  .error__title {
    letter-spacing: 3px;
    text-transform: capitalize;
    margin-bottom: 1rem;
    span {
      font-weight: 700;
      color: var(--primary-500);
      font-size: 2rem;
    }
  }
  .btn {
    display: inline-block;
  }
`;
