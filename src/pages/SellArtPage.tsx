import styled from "styled-components";
import { AddProductSelect, Banner, Loading } from "../components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormRow } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllCategories } from "../features/category/categorySlice";
import { addProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";

const SellArtPage = () => {
  type ProductRequest = {
    name: string;
    description: string;
    image: string;
    categoryId: string;
    endTime: Date;
    startPrice: string;
  };
  const initialNewProduct: ProductRequest = {
    name: "",
    description: "",
    image: "",
    categoryId: "",
    endTime: new Date(),
    startPrice: "",
  };
  const [newProduct, setNewProduct] = useState<ProductRequest>({
    name: "",
    description: "",
    image: "",
    categoryId: "",
    endTime: new Date(),
    startPrice: "",
  });
  const { isLoading, isError, categories } = useAppSelector(
    (store) => store.category
  );
  const { isLoading: productLoading } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, description, image, categoryId, endTime, startPrice } =
      newProduct;
    if (!name || !description || !image || !categoryId) {
      toast.error("Please fill in all the inputs :(");
      return;
    }
    const currentDateTime: Date = new Date();

    if (endTime <= currentDateTime) {
      toast.error("End time cannot be lower than the current time");
      return;
    }
    dispatch(addProduct({ ...newProduct, startPrice: Number(startPrice) }));
    setNewProduct(initialNewProduct);
  };
  return (
    <Wrapper>
      <Banner
        background="banner__bg"
        path="sell art"
        quote="The essence of all beautiful art, all great art, is gratitude"
      />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p className="error">something went wrong... :(</p>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <h5 className="form__title">Sell Art Work</h5>

          <FormRow
            name="name"
            label="product name"
            type="text"
            handleChange={handleChange}
            value={newProduct.name}
          />

          <FormRow
            name="description"
            label="product description"
            type="text"
            handleChange={handleChange}
            value={newProduct.description}
          />
          <FormRow
            name="image"
            label="product image"
            type="text"
            handleChange={handleChange}
            value={newProduct.image}
          />

          <FormRow
            name="startPrice"
            label="start bid price"
            type="number"
            handleChange={handleChange}
            value={newProduct.startPrice}
          />
          <FormRow
            name="endTime"
            label="bid expiry date"
            type="datetime-local"
            handleChange={handleChange}
            value=""
          />
          <AddProductSelect
            name="categoryId"
            label="category"
            options={categories}
            handleChange={handleChange}
          />
          <button
            className="btn btn--secondary btn--dark btn--block form__btn"
            disabled={productLoading}
          >
            {productLoading ? <Loading /> : "Sell Product"}
          </button>
        </form>
      )}
    </Wrapper>
  );
};

export default SellArtPage;

const Wrapper = styled.main`
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-500);
    border-top: 2px solid var(--primary-100);
    margin: 10rem auto;
  }
  .error {
    margin: 10rem auto;
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
  }
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
  .form {
    display: grid;
    gap: 0.5rem;
    width: 80vw;
    max-width: 500px;
    margin: 5rem auto;
    box-shadow: var(--shadow-1);
    padding: 2rem;
    border-radius: var(--border-radius-3);
  }
  .form__title {
    text-align: center;
    color: var(--primary-700);
    letter-spacing: var(--letter-spacing-2);
  }
  .form__btn {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form__btn .spinner {
    width: 20px;
    height: 20px;
    margin: 0;
  }
`;
