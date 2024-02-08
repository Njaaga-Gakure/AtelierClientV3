import styled from "styled-components";
import { Banner, BidItemsGrid, PageButtons } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { pageNumbers } from "../utils/helperFunctions";
import { changePage } from "../features/bid/bidSlice";

const ViewBids = () => {
  const { bidCount, pageNumber } = useAppSelector((store) => store.bid);
  const dispatch = useAppDispatch();
  const handlePageChange = (page: number) => {
    dispatch(changePage(page));
  };
  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="cart"
        quote="An intellectual says a simple thing in a hard way. An artist says a hard thing in a simple way"
      />
      <BidItemsGrid />
      {bidCount > 10 && (
        <div className="content--center page__buttons--center">
          <PageButtons
            pageList={pageNumbers(bidCount)}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        </div>
      )}
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
  .page__buttons--center {
    display: flex;
    justify-content: center;
    margin-bottom: 5rem;
  }
`;
