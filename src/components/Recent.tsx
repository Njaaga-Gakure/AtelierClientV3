import styled from "styled-components";
import Header from "./Header";
import AuctionItem from "./AuctionItem";
import { useEffect } from "react";
import { fetchAllProducts } from "../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Loading } from ".";
const Recent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const { allProducts, isLoading, isError } = useAppSelector(
    (store) => store.product
  );

  return (
    <Wrapper>
      <div className="recent--center content--center">
        <Header
          title="Featured"
          description="Discover vibrant masterpieces in our latest artwork arrivals"
        />
        {isLoading ? (
          <Wrapper>
            <Loading />
          </Wrapper>
        ) : isError ? (
          <p className="error">something went wrong :(</p>
        ) : (
          <div className="recent__products">
            {allProducts.slice(0, 3).map((product) => {
              return <AuctionItem key={product.id} auctionProduct={product} />;
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Recent;

const Wrapper = styled.section`
  min-height: 100vh;
  padding: 5rem 0;

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
  .recent__products {
    margin-top: 3rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;
