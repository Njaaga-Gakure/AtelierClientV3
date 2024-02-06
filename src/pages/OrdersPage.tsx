import styled from "styled-components";
import { Banner, OrderItemsGrid } from "../components";

const OrderPage = () => {
  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="orders"
        quote="One can have no smaller or greater mastery than mastery of oneself"
      />
      <OrderItemsGrid />
    </Wrapper>
  );
};

export default OrderPage;
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
