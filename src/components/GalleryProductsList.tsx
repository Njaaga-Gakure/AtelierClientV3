import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import GridView from "./GridView";
import ListView from "./ListView";
import { useEffect } from "react";
import { fetchFilteredProducts } from "../features/product/productSlice";
import Loading from "./Loading";

const GalleryProductsList = () => {
  const { isGridView } = useAppSelector((store) => store.configuration);
  const {
    filteredProducts,
    isLoading,
    isError,
    pageNumber,
    sort,
    search,
    category,
  } = useAppSelector((store) => store.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [sort, search, category, pageNumber]);
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

  if (filteredProducts.length === 0) {
    return (
      <Wrapper>
        <h5 className="not-found">No products available :(</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {isGridView ? (
        <GridView auctionProducts={filteredProducts} />
      ) : (
        <ListView auctionProducts={filteredProducts} />
      )}
    </Wrapper>
  );
};

export default GalleryProductsList;

const Wrapper = styled.div`
  margin-top: 3rem;
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
  .not-found {
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
  }
`;
