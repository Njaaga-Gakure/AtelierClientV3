import styled from "styled-components";
import FormRow from "./FormRow";
import { type ChangeEvent, type FormEvent } from "react";
import FormSelectRow from "./FormSelectRow";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Loading } from ".";
import {
  changeObj,
  clearFilters,
  handleFiltersChange,
} from "../features/product/productSlice";

const GalleryFilters = () => {
  const { isLoading, categoryOptions, sortOptions, category, sort, search } =
    useAppSelector((store) => store.product);

  const dispatch = useAppDispatch();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value }: changeObj = e.target;
    dispatch(handleFiltersChange({ name, value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper onSubmit={handleSubmit} className="content--center">
      <FormRow
        name="search"
        label="search product"
        type="text"
        handleChange={handleChange}
        value={search}
      />
      <FormSelectRow
        options={categoryOptions}
        name="category"
        label="categories"
        handleChange={handleChange}
        value={category}
      />
      <FormSelectRow
        options={sortOptions}
        name="sort"
        label="sort"
        handleChange={handleChange}
        value={sort}
      />
      <div className="form__buttons">
        {/* <button className="btn" disabled={isLoading}>
          {isLoading ? <Loading /> : "search"}
        </button> */}
        <button className="btn btn--secondary btn--dark" disabled={isLoading}>
          {isLoading ? <Loading /> : "clear filters"}
        </button>
      </div>
    </Wrapper>
  );
};

export default GalleryFilters;

const Wrapper = styled.form`
  display: grid;
  gap: 1rem;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: var(--shadow-1);
  border-radius: var(--border-radius-3);
  .form__buttons {
    display: grid;
    gap: 0.5rem;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    .form__buttons {
      grid-template-columns: repeat(2, 1fr);
      align-items: end;
    }
  }
`;
