import { AdminPanelNav, AdminProductsTable } from "../../components";
import styled from "styled-components";

const ManageProductsPage = () => {
  return (
    <Wrapper>
      <AdminPanelNav />
      <main className="products">
        <AdminProductsTable />
      </main>
    </Wrapper>
  );
};

export default ManageProductsPage;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  .products {
    padding: 2rem;
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
