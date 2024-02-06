import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

const AdminSearch = () => {
  return (
    <Wrapper>
      <input
        type="search"
        name=""
        id=""
        className="form__search"
        placeholder="Search..."
      />
      <button className="form__btn">
        <CiSearch />
      </button>
    </Wrapper>
  );
};

export default AdminSearch;

const Wrapper = styled.form`
  position: relative;
  overflow: hidden;
  height: 30px;
  .form__search {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid var(--primary-500);
    border-radius: 50px;
    overflow: hidden;
    outline: none;
  }
  .form__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 0 50px 50px 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--primary-500);
    background-color: var(--primary-500);
    color: var(--primary-100);
    font-size: 1.25rem;
    padding: 0 0.5rem;
  }
  ::placeholder {
    letter-spacing: 2px;
  }
`;
