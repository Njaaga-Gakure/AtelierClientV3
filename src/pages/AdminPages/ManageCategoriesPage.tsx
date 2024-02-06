import styled from "styled-components";
import { AdminPanelNav, AdminCategoriesTable } from "../../components";

const ManageCategoriesPage = () => {
  return (
    <Wrapper>
      <AdminPanelNav />
      <main className="categories">
        <AdminCategoriesTable />
      </main>
    </Wrapper>
  );
};

export default ManageCategoriesPage;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  .categories {
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
