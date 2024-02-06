import styled from "styled-components";
import { Banner, MyAuctionsGrid, PageButtons } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { pageNumbers } from "../utils/helperFunctions";
import { changeSellerAuctionsPage } from "../features/product/productSlice";

const ViewAuctionedItems = () => {
  const { sellerProductsCount, sellerPageNumber } = useAppSelector(
    (store) => store.product
  );
  const dispatch = useAppDispatch();
  const handlePageChange = (page: number) => {
    dispatch(changeSellerAuctionsPage(page));
  };
  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="my auctions"
        quote="Art is never finished, only abandoned"
      />
      <MyAuctionsGrid />
      <div className="content__center page__btn--center">
        <PageButtons
          pageList={pageNumbers(sellerProductsCount)}
          handlePageChange={handlePageChange}
          pageNumber={sellerPageNumber}
        />
      </div>
    </Wrapper>
  );
};

export default ViewAuctionedItems;

const Wrapper = styled.div`
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
  .page__btn--center {
    display: flex;
    justify-content: center;
    margin-bottom: 5rem;
  }
`;
