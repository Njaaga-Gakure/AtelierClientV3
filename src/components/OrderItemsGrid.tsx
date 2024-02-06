import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { priceFormatter } from "../utils/helperFunctions";
import { getPendingOrders } from "../features/order/orderSlice";

const OrderItemsGrid = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, orders, orderCount } = useAppSelector(
    (store) => store.order
  );
  useEffect(() => {
    dispatch(getPendingOrders());
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
        <p className="error">something went wrong</p>
      </Wrapper>
    );
  }
  if (orderCount === 0) {
    return (
      <Wrapper>
        <div className="not-found">
          <p className="not-found">no order pending orders found ... :(</p>{" "}
          <Link className="btn btn--secondary" to="/cart">
            to my bids
          </Link>
        </div>
        ;
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="grid--center content--center">
        <div className="grid__header">
          <h5 className="grid__heading">product image</h5>
          <h5 className="grid__heading">product name</h5>
          <h5 className="grid__heading">order amount</h5>
        </div>
        <hr />

        {orders.map((order) => {
          return (
            <div key={order.id} className="cart__item">
              <img
                src={order.productImage}
                alt={order.productName}
                className="product__img"
              />
              <p className="product__name">
                <span>product name:</span>
                {order.productName.substring(0, 15)}...
              </p>
              <p className="product__current-bid">
                <span>order amount:</span>
                {priceFormatter(order.orderAmount)}
              </p>
              <button className="btn btn--secondary">pay</button>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default OrderItemsGrid;

const Wrapper = styled.section`
  padding: 5rem 0;
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
    display: grid;
    justify-content: center;
    p {
      text-align: center;
      letter-spacing: var(--letter-spacing-2);
      text-transform: capitalize;
      margin-bottom: 1rem;
    }
    justify-self: center;
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
  @media (min-width: 800px) {
    .grid__header,
    hr {
      display: block;
    }
    .grid__header,
    .cart__item {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
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
