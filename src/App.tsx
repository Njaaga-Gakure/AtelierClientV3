import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Gallery,
  Home,
  Register,
  BiddingPage,
  SharedLayouts,
  AdminSharedLayout,
  AdminDashboard,
  Error,
  ManageUsersPage,
  ManageProductsPage,
  ManageCategoriesPage,
  SellArtPage,
  ViewBidsPage,
  ViewAuctionedItems,
  AddNewCategory,
  AdminProtectedLayout,
  ProtectedLayout,
  ProtectedSellerRoutes,
  OrdersPage,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <SharedLayouts />
            </ProtectedLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cart" element={<ViewBidsPage />} />
          <Route path="/sell" element={<ProtectedSellerRoutes />}>
            <Route index element={<SellArtPage />} />
            <Route
              path="/sell/view-auctioned-items"
              element={<ViewAuctionedItems />}
            />
          </Route>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/gallery/:id" element={<BiddingPage />} />
        </Route>
        <Route
          path="/admin-panel"
          element={
            <AdminProtectedLayout>
              <AdminSharedLayout />
            </AdminProtectedLayout>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="/admin-panel/users" element={<ManageUsersPage />} />
          <Route
            path="/admin-panel/products"
            element={<ManageProductsPage />}
          />

          <Route
            path="/admin-panel/view-categories"
            element={<ManageCategoriesPage />}
          />
          <Route
            path="/admin-panel/add-categories"
            element={<AddNewCategory />}
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
      />
    </Router>
  );
};

export default App;
