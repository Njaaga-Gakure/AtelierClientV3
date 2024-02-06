import styled from "styled-components";
import { AdminPanelNav, AdminUsersTable } from "../../components";

const ManageUsersPage = () => {
  return (
    <Wrapper>
      <AdminPanelNav />
      <main className="users">
        <AdminUsersTable />
      </main>
    </Wrapper>
  );
};

export default ManageUsersPage;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  .users {
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
