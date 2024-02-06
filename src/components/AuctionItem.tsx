import styled from "styled-components";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { FilteredProduct, Product } from "../features/product/productSlice";
type AuctionItemProps = {
  auctionProduct: Product | FilteredProduct;
};

const AuctionItem: FC<AuctionItemProps> = ({ auctionProduct }) => {
  const { id, image, name } = auctionProduct;
  return (
    <Wrapper>
      <img className="product__img" src={image} alt={name} />
      <div className="product__body">
        <h5 className="product__name">{name}</h5>
      </div>
      <div className="product__footer">
        <Link to={`/gallery/${id}`} className="btn btn--secondary product__btn">
          more details
        </Link>
      </div>
    </Wrapper>
  );
};

export default AuctionItem;

const Wrapper = styled.article`
  padding: 1rem;
  box-shadow: var(--shadow-1);
  background-color: var(--white);
  border-radius: var(--border-radius-2);
  transition: var(--transition);
  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-2);
  }
  .product__img {
    height: 200px;
  }
  .product__body {
    padding: 1rem 0;
  }
  .product__name {
    letter-spacing: var(--letter-spacing-1);
    text-transform: capitalize;
    color: var(--primary-500);
    text-align: center;
  }
  .product__btn {
    display: inline-block;
    padding: 0.25rem;
    width: 100%;
    text-align: center;
    transition: var(--transition);
  }
`;
