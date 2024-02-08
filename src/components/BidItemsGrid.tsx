import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUserBids } from "../features/bid/bidSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import Loading from "./Loading";
import { priceFormatter } from "../utils/helperFunctions";
import { placeOrder } from "../features/order/orderSlice";

const BidItemsGrid = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, userBids, pageNumber } = useAppSelector(
    (store) => store.bid
  );
  useEffect(() => {
    dispatch(getUserBids());
  }, [pageNumber]);
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
        <p className="error">something went wrong</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="grid--center content--center">
        <div className="grid__header">
          <h5 className="grid__heading">product image</h5>
          <h5 className="grid__heading">product name</h5>
          <h5 className="grid__heading">current bid</h5>
          <h5 className="grid__heading">highest bid</h5>
          <h5 className="grid__heading">bid status</h5>
        </div>
        <hr />

        {userBids.map((userBid) => {
          return (
            <div key={userBid.id} className="cart__item">
              <img
                src={userBid.productImage}
                alt={userBid.productName}
                className="product__img"
              />
              <p className="product__name">
                <span>product name:</span>
                {userBid.productName.substring(0, 15)}...
              </p>
              <p className="product__current-bid">
                <span>current bid:</span>
                {priceFormatter(userBid.bidAmount)}
              </p>
              <p className="product__highest-bid">
                <span>highest bid:</span>
                {priceFormatter(userBid.currentHighestBid)}
              </p>
              <p className="product__bid-status">
                <span>bid status:</span>
                {userBid.status === "active"
                  ? userBid.status
                  : userBid.status === "closed" &&
                    userBid.currentHighestBid === userBid.bidAmount
                  ? "won"
                  : "lost"}
              </p>
              {userBid.status == "active" ? (
                <Link
                  className="btn btn--secondary"
                  to={`/gallery/${userBid.productId}`}
                >
                  bid again
                </Link>
              ) : userBid.status === "closed" &&
                userBid.currentHighestBid === userBid.bidAmount ? (
                <button
                  onClick={() => dispatch(placeOrder({ bidId: userBid.id }))}
                  className="btn btn--secondary"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "checkout"}
                </button>
              ) : (
                <Link className="btn btn--secondary" to="/gallery">
                  gallery
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default BidItemsGrid;

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

  .grid__header,
  hr {
    display: none;
  }
  .cart__item:not(:last-child) {
    margin-bottom: 2rem;
  }
  .cart__item {
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
    display: inline-block;
    margin-top: 0.5rem;
  }
  .btn .spinner {
    width: 20px;
    height: 20px;
    margin: 0;
  }
  @media (min-width: 800px) {
    .grid__header,
    hr {
      display: block;
    }
    .grid__header,
    .cart__item {
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
    .cart__item {
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
