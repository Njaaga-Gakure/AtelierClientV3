import styled from "styled-components";
import { Banner, BidItemsGrid } from "../components";

const ViewBids = () => {
  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="cart"
        quote="An intellectual says a simple thing in a hard way. An artist says a hard thing in a simple way"
      />
      <BidItemsGrid />
    </Wrapper>
  );
};

export default ViewBids;
const Wrapper = styled.main`
  .banner__bg {
    padding: 2rem;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
      ),
      url("/art-5.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
