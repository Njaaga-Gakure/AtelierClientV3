import styled from "styled-components";
import SingleCategory from "./SingleCategory";
import { getAllCategories } from "../features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { Loading } from ".";

const CategoriesGrid = () => {
  const { isLoading, isError, categories } = useAppSelector(
    (store) => store.category
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }
  if (isError) {
    return (
      <Wrapper>
        <p className="error">something went wrong :(</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {categories
        .filter((category) =>
          [
            "classical",
            "portraits",
            "realism",
            "contemporary",
            "abstract",
          ].includes(category.name)
        )
        .map((category) => {
          return <SingleCategory key={category.id} category={category} />;
        })}
    </Wrapper>
  );
};

export default CategoriesGrid;

const Wrapper = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-auto-rows: 200px;
  gap: 1rem;
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-500);
    border-top: 2px solid var(--primary-100);
    margin: 10rem auto;
  }
  .error {
    margin-top: 15rem;
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 200px);
    grid-template-areas:
      "category--classical category--portraits category--realism"
      "category--classical category--abstract category--abstract"
      "category--contemporary category--contemporary category--contemporary";
    .category--classical {
      grid-area: category--classical;
    }

    .category--portraits {
      grid-area: category--portraits;
    }

    .category--realism {
      grid-area: category--realism;
    }

    .category--abstract {
      grid-area: category--abstract;
    }
    .category--contemporary {
      grid-area: category--contemporary;
    }
  }
`;
