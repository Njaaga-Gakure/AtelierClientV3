import { Banner, PageButtons } from "../components";
import styled from "styled-components";
import { GalleryFilters, GalleryProductsList } from "../components";
import { TbGridDots } from "react-icons/tb";
import { TiThList } from "react-icons/ti";
import { toggleGridView } from "../features/configuration/configurationSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { pageNumbers } from "../utils/helperFunctions";
import { changePage } from "../features/product/productSlice";

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { isGridView } = useAppSelector((store) => store.configuration);
  const { productCount, isLoading, isError, pageNumber } = useAppSelector(
    (store) => store.product
  );
  const handlePageChange = (page: number) => {
    dispatch(changePage(page));
  };
  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="gallery"
        quote="Art is not what you see but what you make others see"
      />
      <GalleryFilters />
      <div className="gallery__header content--center">
        <div className="header__info">
          <p className="gallery__count">{`(${
            isLoading || isError ? 0 : productCount
          }) products found`}</p>
          <div className="gallery__toggle">
            <button
              onClick={() => dispatch(toggleGridView(true))}
              className={
                isGridView
                  ? "btn__toggle-view view--active"
                  : "btn__toggle-view"
              }
            >
              <TbGridDots />
            </button>
            <button
              onClick={() => dispatch(toggleGridView(false))}
              className={
                !isGridView
                  ? "btn__toggle-view view--active"
                  : "btn__toggle-view"
              }
            >
              <TiThList />
            </button>
          </div>
        </div>
        <hr />
        <GalleryProductsList />
      </div>
      {productCount > 10 && (
        <div className="content--center page__buttons--center">
          <PageButtons
            pageList={pageNumbers(productCount)}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Gallery;

const Wrapper = styled.main`
  padding-bottom: 5rem;
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
  .gallery__header {
    margin-bottom: 2rem;
  }
  .header__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .gallery__count {
    letter-spacing: 2px;
    text-transform: capitalize;
  }
  .gallery__toggle {
    display: flex;
    gap: 0.25rem;
  }
  .btn__toggle-view {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    font-size: 1.4rem;
    color: var(--gray-600);
  }
  .view--active {
    background-color: var(--primary-500);
    color: var(--white);
  }
  .page__buttons--center {
    display: flex;
    justify-content: center;
  }
`;
