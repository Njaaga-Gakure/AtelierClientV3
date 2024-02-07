import styled from "styled-components";
import { type FC } from "react";
import { Link } from "react-router-dom";
import MyCountdownComponent from "./MyCountdownComponent";
import { FilteredProduct } from "../features/product/productSlice";
import { priceFormatter } from "../utils/helperFunctions";

type ListAuctionItemProps = {
  auctionProduct: FilteredProduct;
};

const ListAuctionItem: FC<ListAuctionItemProps> = ({
  auctionProduct: {
    id,
    bids,
    name,
    description,
    image,
    category,
    currentHighestBid,
    endTime,
  },
}) => {
  const currentDate: Date = new Date();
  console.log(typeof currentDate);
  console.log(typeof endTime);
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="item__img" />
      </div>
      <div className="item__info">
        <p className="item__name">
          <span className="item__label">name: </span>
          {name}
        </p>
        <p className="item__bids">
          <span className="item__label">bids: </span>
          {bids}
        </p>
        <p className="item__category">
          <span className="item__label">category: </span>
          {category}
        </p>
        <p className="item__highest-bid">
          <span className="item__label">highest bid: </span>
          {priceFormatter(currentHighestBid)}
        </p>
        <MyCountdownComponent endTime={endTime} />
        <div className="item__description">
          {description.substring(0, 60)}...
        </div>
        {new Date(endTime) <= currentDate ? (
          <span className="closed">closed</span>
        ) : (
          <Link className="btn btn--secondary" to={`/gallery/${id}`}>
            details
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

export default ListAuctionItem;

const Wrapper = styled.article`
  display: grid;
  align-items: center;
  gap: 1rem;
  .img-container {
    height: 250px;
    border-radius: var(--border-radius-2);
    overflow: hidden;
  }
  .item__img {
    height: 100%;
  }
  .item__info {
    display: grid;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: var(--letter-spacing-2);
  }
  .item__label {
    text-transform: capitalize;
    background-color: var(--primary-100);
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radius-1);
    margin-right: 0.5rem;
    color: var(--primary-500);
  }
  .item__category {
    text-transform: capitalize;
  }
  .item__description {
    margin: 0.5rem 0;
    color: var(--gray-500);
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: start;
  }
  .closed {
  }
  .counter--active,
  .counter--complete {
    display: inline-block;
    margin-top: 1rem;
    background: #64ff5c;
    justify-self: start;
    padding: 0.25rem 1rem;
    border-radius: 50px;
    color: #fff;
    letter-spacing: 1px;
    font-weight: 700;
  }
  .closed {
    border: 1px solid #f8958c;
    background-color: transparent;
    color: #f8958c;
    text-transform: uppercase;
    padding: 0.25rem 1rem;
    border-radius: 50px;
    justify-self: start;
  }
  .counter--complete {
    background: #f8958c;
  }
  @media (min-width: 800px) {
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    .img-container {
      height: 300px;
    }
  }
`;
