import { ChangeEvent } from "react";
import { AdminPanelNav, FormRow } from "../../components";
import styled from "styled-components";
const AddNewCategory = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <Wrapper>
      <AdminPanelNav />
      <main className="add-category">
        <form className="form">
          <FormRow
            name="name"
            type="text"
            label="name"
            handleChange={handleChange}
            value=""
          />
          <FormRow
            name="image"
            type="text"
            label="image"
            handleChange={handleChange}
            value=""
          />
          <button className="btn btn--secondary">add new category</button>
        </form>
      </main>
    </Wrapper>
  );
};

export default AddNewCategory;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  .add-category {
    padding: 5rem 0;
  }
  .form {
    display: grid;
    gap: 1rem;
    width: 80vw;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: var(--shadow-1);
    padding: 2rem;
    border-radius: var(--border-radius-3);
  }

  @media (min-width: 500px) {
    width: calc(100% - 60px);
    left: 60px;
  }

  @media (min-width: 800px) {
    width: calc(100% - 230px);
    left: 230px;
  }
`;
