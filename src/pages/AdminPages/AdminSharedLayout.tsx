import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AdminSidebar } from "../../components";

const AdminSharedLayout = () => {
  return (
    <Wrapper>
      <AdminSidebar />
      <Outlet />
    </Wrapper>
  );
};

export default AdminSharedLayout;

const Wrapper = styled.div``;
