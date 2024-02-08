import styled from "styled-components";
import { AiOutlineEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAdminProducts } from "../features/adminProducts/adminProductsSlice";
import { Loading } from ".";
import { priceFormatter } from "../utils/helperFunctions";
import { toast } from "react-toastify";

const AdminProductsTable = () => {
  const dispatch = useAppDispatch();
  const { isLoading, adminProducts, isError } = useAppSelector(
    (store) => store.adminProducts
  );
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="error-container">
        <p className="error">something went wrong... :(</p>
      </div>
    );
  }
  return (
    <Wrapper>
      <caption>manage products</caption>
      <thead>
        <tr>
          <th>name</th>
          <th>category</th>
          <th>bids</th>
          <th>status</th>
          <th>start price (ksh)</th>
          <th>highest bid (ksh)</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {adminProducts.map((product) => {
          return (
            <tr key={product.id}>
              <td data-cell="name">{product.name}</td>
              <td data-cell="category">{product.category}</td>
              <td data-cell="no. of bids">{product.bids}</td>
              <td data-cell="status">{product.status}</td>
              <td data-cell="start price">
                {priceFormatter(product.startPrice)}
              </td>
              <td data-cell="highest bid">
                {priceFormatter(product.currentHighestBid)}
              </td>
              <td data-cell="actions" className="table__buttons">
                <button
                  onClick={() => toast.warning("under development")}
                  className="table__btn table__edit"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => toast.warning("under development")}
                  className="table__btn table__delete"
                >
                  <FaTrashCan />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Wrapper>
  );
};

export default AdminProductsTable;

const Wrapper = styled.table`
  width: 100%;
  background: var(--gray-100);
  border-radius: 0 0 var(--border-radius-3) var(--border-radius-3);
  box-shadow: var(--shadow-1);
  color: var(--gray-700);
  border-collapse: collapse;
  overflow: hidden;

  th,
  td {
    padding: 0.5rem;
  }

  th {
    text-align: left;
    text-transform: capitalize;
    background-color: var(--primary-100);
  }
  caption {
    border-radius: var(--border-radius-3) var(--border-radius-3) 0 0;
    background-color: var(--gray-50);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: var(--letter-spacing-1);
    text-transform: capitalize;
    padding: 1rem;
  }
  tr:nth-child(even) {
    background-color: var(--gray-50);
  }
  .table__buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .table__btn {
    background-color: transparent;
    border: none;
    font-size: 1.25rem;
  }
  .table__edit {
    color: #5cb85c;
  }
  .table__delete {
    color: var(--red-danger);
  }
  @media (max-width: 1000px) {
    td {
      display: grid;
      grid-template-columns: 15ch auto;
      align-items: center;
      /* gap: 1rem; */
      letter-spacing: var(--letter-spacing-1);
    }
    td::before {
      content: attr(data-cell) ": ";
      padding: 0.25rem;
      text-transform: capitalize;
      font-weight: 700;
      color: var(--primary-500);
    }
    td:first-child {
      padding-top: 1rem;
    }
    td:last-child {
      padding-bottom: 1rem;
    }
    td:last-child::before {
      margin-right: 3rem;
    }
    th {
      display: none;
    }
    .table__buttons {
      gap: 1rem;
    }
    @media (max-width: 430px) {
      td {
        grid-template-columns: auto;
      }
    }
  }
`;
