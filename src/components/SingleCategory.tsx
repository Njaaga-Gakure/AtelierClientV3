import { type FC } from "react";
import styled from "styled-components";
import { Category } from "../features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { handleFiltersChange } from "../features/product/productSlice";

type SingleCategoryProps = {
  category: Category;
};

const SingleCategory: FC<SingleCategoryProps> = ({
  category: { name, image },
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCategoryChange = (categoryName: string) => {
    dispatch(handleFiltersChange({ name: "category", value: categoryName }));
    navigate("/gallery");
  };
  return (
    <Wrapper
      onClick={() => handleCategoryChange(name)}
      className={`category--${name}`}
    >
      <img src={image} alt={name} className={`category__img `} />
      <h5 className="category__name">{name}</h5>
    </Wrapper>
  );
};

export default SingleCategory;

const Wrapper = styled.article`
  border-radius: var(--border-radius-2);
  box-shadow: var(--shadow-2);
  overflow: hidden;
  position: relative;
  transition: var(--transition);
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .category__img {
    height: 100%;
  }
  .category__name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: var(--white);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
`;
