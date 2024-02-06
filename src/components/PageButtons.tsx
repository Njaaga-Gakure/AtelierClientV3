import { type FC } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
type PageButtonsProp = {
  pageList: number[];
  handlePageChange: (page: number) => void;
  pageNumber: number;
};

const PageButtons: FC<PageButtonsProp> = ({
  pageList,
  handlePageChange,
  pageNumber,
}) => {
  return (
    <Wrapper className="page__buttons">
      <button className="prev__btn">
        <FaChevronLeft />
      </button>
      {pageList.map((page) => {
        return (
          <button
            style={{
              backgroundColor:
                pageNumber === page ? "var(--black)" : "var(--primary-500)",
            }}
            onClick={() => handlePageChange(page)}
            className="page__btn"
            key={page}
          >
            {page}
          </button>
        );
      })}
      <button className="next__btn">
        <FaChevronRight />
      </button>
    </Wrapper>
  );
};

export default PageButtons;

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  .prev__btn,
  .next__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: var(--primary-500);
    font-size: 1.25rem;
  }
  .page__btn {
    width: 30px;
    height: 30px;
    background-color: var(--primary-500);
    border: none;
    border-radius: var(--border-radius-1);
    color: var(--white);
    box-shadow: var(--shadow-1);
  }
`;
