import { ChangeEvent, FormEvent, useState } from "react";
import { AdminPanelNav, FormRow, Loading } from "../../components";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CategoryRequest } from "../../features/adminCategories/adminCategoriesSlice";
import { addCategory } from "../../features/adminCategories/adminCategoriesSlice";

const AddNewCategory = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.adminCategories);
  const [newCategory, setNewCategory] = useState<CategoryRequest>({
    name: "",
    image: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addCategory(newCategory));
  };
  return (
    <Wrapper>
      <AdminPanelNav />
      <main className="add-category">
        <form onSubmit={handleSubmit} className="form">
          <FormRow
            name="name"
            type="text"
            label="name"
            handleChange={handleChange}
            value={newCategory.name}
          />
          <FormRow
            name="image"
            type="text"
            label="image"
            handleChange={handleChange}
            value={newCategory.image}
          />
          <button className="btn btn--secondary" disabled={isLoading}>
            {isLoading ? <Loading /> : "add new category"}
          </button>
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
  .btn {
    display: flex;
    justify-content: center;
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
