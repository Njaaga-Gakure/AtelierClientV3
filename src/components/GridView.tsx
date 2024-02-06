import { type FC } from "react";
import styled from "styled-components";
import AuctionItem from "./AuctionItem";
import { FilteredProduct } from "../features/product/productSlice";

type GridViewProps = {
  auctionProducts: FilteredProduct[];
};
const GridView: FC<GridViewProps> = ({ auctionProducts }) => {
  return (
    <Wrapper>
      {auctionProducts.map((auctionProduct) => {
        return (
          <AuctionItem
            key={auctionProduct.id}
            auctionProduct={auctionProduct}
          />
        );
      })}
    </Wrapper>
  );
};

export default GridView;

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
