import { type FC } from "react";
import styled from "styled-components";
import ListAuctionItem from "./ListAuctionItem";
import { FilteredProduct } from "../features/product/productSlice";

type ListViewProps = {
  auctionProducts: FilteredProduct[];
};

const ListView: FC<ListViewProps> = ({ auctionProducts }) => {
  return (
    <Wrapper>
      {auctionProducts.map((auctionProduct) => {
        return (
          <ListAuctionItem
            key={auctionProduct.id}
            auctionProduct={auctionProduct}
          />
        );
      })}
    </Wrapper>
  );
};

export default ListView;

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
`;
