import styled from "styled-components";
import { AdminPanelNav, Loading } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllUsers } from "../../features/adminUsers/adminUsersSlice";
import { getAdminCategories } from "../../features/adminCategories/adminCategoriesSlice";
import { fetchAdminProducts } from "../../features/adminProducts/adminProductsSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAdminCategories());
    dispatch(fetchAdminProducts());
  }, []);
  const {
    isLoading: usersLoading,
    isError: usersError,
    usersCount,
  } = useAppSelector((store) => store.adminUsers);
  const {
    isLoading: categoriesLoading,
    isError: categoriesError,
    adminCategoriesCount,
  } = useAppSelector((store) => store.adminCategories);
  const {
    isLoading: productsLoading,
    isError: productsError,
    productCount,
  } = useAppSelector((store) => store.adminProducts);
  return (
    <Wrapper>
      <AdminPanelNav />
      {usersLoading || categoriesLoading || productsLoading ? (
        <div>
          <Loading />
        </div>
      ) : usersError || categoriesError || productsError ? (
        <p className="error">something went wrong... :(</p>
      ) : (
        <div className="admin__insights">
          <article className="admin__insight admin__insight--users">
            <p className="count">{usersCount}</p>
            <h5>users</h5>
          </article>
          <article className="admin__insight admin__insight--products">
            <p className="count">{productCount}</p>
            <h5>products</h5>
          </article>
          <article className="admin__insight admin__insight--categories">
            <p className="count">{adminCategoriesCount}</p>
            <h5>categories</h5>
          </article>
        </div>
      )}
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-500);
    border-top: 2px solid var(--primary-100);
    margin: 10rem auto;
  }
  .error {
    margin: 5rem 0;
    text-align: center;
    letter-spacing: var(--letter-spacing-2);
    text-transform: capitalize;
  }
  .admin__insights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 5rem 2rem;
  }
  .admin__insight {
    padding: 2rem;
    border-radius: var(--border-radius-3);
    text-align: center;

    box-shadow: var(--shadow-1);
    p {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-100);
    }
    h5 {
      letter-spacing: var(--letter-spacing-2);
      text-transform: capitalize;
      color: var(--white);
    }
  }
  .admin__insight--users {
    background-color: #f2545b;
  }
  .admin__insight--products {
    background-color: #0a2463;
  }
  .admin__insight--categories {
    background-color: #0cca4a;
  }
  @media (min-width: 500px) {
    width: calc(100% - 60px);
    left: 60px;
  }

  @media (min-width: 800px) {
    width: calc(100% - 230px);
    left: 230px;
  }
`;
