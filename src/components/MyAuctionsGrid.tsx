import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Loading } from ".";
import { priceFormatter } from "../utils/helperFunctions";
import { useEffect } from "react";
import { fetchSellerProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const MyAuctionsGrid = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, sellerProducts, sellerPageNumber } =
    useAppSelector((store) => store.product);
  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [sellerPageNumber]);
  return (
    <Wrapper>
      <div className="grid--center content--center">
        <div className="grid__header">
          <h5 className="grid__heading">product image</h5>
          <h5 className="grid__heading">product name</h5>
          <h5 className="grid__heading">no. of bids</h5>
          <h5 className="grid__heading">highest bid</h5>
          <h5 className="grid__heading">status</h5>
        </div>
        <hr />
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p className="error">something went wrong... :(</p>
        ) : sellerProducts.length === 0 ? (
          <div className="not-found">
            <p className="error">You have no products up for auction.. :(</p>
            <Link to="/sell" className="btn btn--secondary">
              sell art
            </Link>
          </div>
        ) : (
          sellerProducts.map((product) => {
            return (
              <div key={product.id} className="auctioned__item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product__img"
                />
                <p className="product__name">
                  <span>product name:</span>
                  {product.name.substring(0, 10)}...
                </p>
                <p className="product__current-bid">
                  <span>no of bids:</span>
                  {product.bids}
                </p>
                <p className="product__highest-bid">
                  <span>highest bid:</span>
                  {priceFormatter(product.currentHighestBid)}
                </p>
                <p className="product__bid-status">
                  <span>status:</span>
                  {product.status}
                </p>
                <button className="edit__btn btn btn--secondary btn--success">
                  <FaEdit />
                </button>
              </div>
            );
          })
        )}
      </div>
    </Wrapper>
  );
};

export default MyAuctionsGrid;

const Wrapper = styled.section`
  padding: 5rem 0 2rem;
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-500);
    border-top: 2px solid var(--primary-100);
    margin: 10rem auto;
  }
  .error {
    margin: auto 0;
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
  }
  .not-found {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 5rem 0;
  }
  .not-found .error {
    margin-bottom: 1rem;
  }
  .grid__header,
  hr {
    display: none;
  }
  .auctioned__item:not(:last-child) {
    margin-bottom: 2rem;
  }
  .auctioned__item {
    letter-spacing: var(--letter-spacing-1);
    text-transform: capitalize;
    span {
      margin-right: 0.5rem;
      color: var(--primary-500);
    }
  }
  .product__img {
    width: 300px;
    height: 200px;
    border-radius: 5px;
  }
  .product__name {
    margin-top: 1rem;
  }
  .btn {
    justify-self: center;
    margin-top: 0.5rem;
  }
  @media (min-width: 800px) {
    .grid__header,
    hr {
      display: block;
    }
    .grid__header,
    .auctioned__item {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      align-items: center;
      gap: 2rem;
      margin-bottom: 1rem;
      white-space: nowrap;
    }
    .grid__heading {
      letter-spacing: 2px;
      font-size: 1rem;
      text-transform: capitalize;
      color: var(--primary-500);
    }
    hr {
      margin-bottom: 2rem;
    }
    .product__img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    .product__name {
      margin-top: 0rem;
    }
    .auctioned__item {
      border-bottom: 1px solid var(--primary-500);
      padding-bottom: 1rem;
      span {
        display: none;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
