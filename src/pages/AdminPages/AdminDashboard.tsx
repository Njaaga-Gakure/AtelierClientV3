import styled from "styled-components";
import { AdminPanelNav } from "../../components";
const Dashboard = () => {
  return (
    <Wrapper>
      <AdminPanelNav />
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  @media (min-width: 500px) {
    width: calc(100% - 60px);
    left: 60px;
  }

  @media (min-width: 800px) {
    width: calc(100% - 230px);
    left: 230px;
  }
`;
