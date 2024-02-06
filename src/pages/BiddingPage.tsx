import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Banner, Loading } from "../components";
import MyCountdownComponent from "../components/MyCountdownComponent";
import { useEffect, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSingleProduct } from "../features/product/productSlice";
import { priceFormatter } from "../utils/helperFunctions";
import { placeBid } from "../features/bid/bidSlice";
import { toast } from "react-toastify";

const BiddingPage = () => {
  // const [bidAmount, setBidAmount] = useState<number>(0);
  const bidAmount = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isError, isLoading, singleProduct } = useAppSelector(
    (store) => store.product
  );
  const { isLoading: placeBidLoading } = useAppSelector((store) => store.bid);
  const {} = useAppSelector((store) => store.bid);
  useEffect(() => {
    dispatch(fetchSingleProduct(id as string));
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (bidAmount.current?.value) {
      dispatch(
        placeBid({
          productId: singleProduct?.id as string,
          bidAmount: Number(bidAmount.current.value),
        })
      );
      bidAmount.current.value = "";
    } else {
      toast.error("enter a valid input");
    }
  };

  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="gallery | bid"
        quote="The aim of art is to represent not the outward appearance of things, but the inward significance."
      />
      <div className="content--center">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p className="error">something went wrong :(</p>
        ) : !singleProduct ? (
          <p className="not-found">Product was not found :(</p>
        ) : (
          <article className="bid-item">
            <img
              src={singleProduct.image}
              alt={singleProduct.name}
              className="bid-item__img"
            />
            <div className="bid-item__info">
              <div className="bid-item__header">
                <h5 className="bid-item__name">{singleProduct.name}</h5>
                <p className="bid-item__category">{singleProduct.category}</p>
              </div>
              <p className="bid-item__bids">
                <span>{`(${singleProduct.bids})`}</span>{" "}
                {singleProduct.bids == 1 ? "bid" : "bids"}
              </p>
              <p className="bid-item__highest">
                <span>highest bid: </span>
                {priceFormatter(singleProduct.currentHighestBid)}
              </p>
              <p className="bid-item__description">
                {singleProduct.description}
              </p>
              <MyCountdownComponent endTime={singleProduct.endTime} />
              <form onSubmit={handleSubmit} className="bid-item__form">
                <input
                  type="number"
                  name=""
                  id=""
                  className="form__input"
                  placeholder="Enter your bid..."
                  ref={bidAmount}
                  // value={bidAmount}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   setBidAmount(Number(e.target.value))
                  // }
                />
                <button
                  className="btn btn--secondary btn--block"
                  disabled={placeBidLoading}
                >
                  {placeBidLoading ? <Loading /> : "place bid"}
                </button>
              </form>
            </div>
          </article>
        )}
      </div>
    </Wrapper>
  );
};

export default BiddingPage;

const Wrapper = styled.section`
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
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-500);
    border-top: 2px solid var(--primary-100);
    margin: 10rem auto;
  }
  .error,
  .not-found {
    margin-top: 10rem;
    margin-bottom: 10rem;
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
  }
  .bid-item {
    display: grid;
    padding: 5rem 0;
    gap: 1rem;
    /* height: 500px; */
  }
  .bid-item__img {
    border-radius: var(--border-radius-2);
    height: 300px;
  }
  .bid-item__header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    letter-spacing: var(--letter-spacing-2);
    margin-bottom: 0.5rem;
  }
  .bid-item__name,
  .bid-item__bids,
  .bid-item__highest {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing-2);
    span {
      font-weight: 700;
      color: var(--primary-500);
    }
  }
  .bid-item__category {
    background-color: var(--primary-100);
    color: var(--primary-500);
    padding: 0.25rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    text-transform: capitalize;
  }
  .bid-item__description {
    letter-spacing: var(--letter-spacing-1);
    color: var(--gray-500);
    margin-bottom: 1rem;
  }
  .counter--active,
  .counter--complete {
    display: inline-block;
    margin-bottom: 1rem;
    background: #64ff5c;
    justify-self: start;
    padding: 0.25rem 1rem;
    border-radius: 50px;
    color: #fff;
    letter-spacing: 1px;
    font-weight: 700;
  }
  .counter--complete {
    background: #f8958c;
  }
  .form__input {
    margin-bottom: 1rem;
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: var(--border-radius-2);
    background: transparent;
    border: 1px solid var(--black);
    outline-color: var(--primary-500);
  }
  ::placeholder {
    letter-spacing: var(--letter-spacing-2);
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn .spinner {
    margin: 0;
    width: 20px;
    height: 20px;
  }
  @media (min-width: 800px) {
    .bid-item {
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem;
      align-items: center;
    }
    .bid-item__img {
      /* height: 100%; */
      height: 400px;
    }
  }
`;
