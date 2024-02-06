import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice } from "../features/configuration/configurationSlice";
import { userSlice } from "../features/user/userSlice";
import { productSlice } from "../features/product/productSlice";
import { bidSlice } from "../features/bid/bidSlice";
import { categorySlice } from "../features/category/categorySlice";
import { adminUsersSlice } from "../features/adminUsers/adminUsersSlice";
import { adminProductSlice } from "../features/adminProducts/adminProductsSlice";
import { adminCategoriesSlice } from "../features/adminCategories/adminCategoriesSlice";
import { orderSlice } from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    user: userSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    bid: bidSlice.reducer,
    order: orderSlice.reducer,
    adminUsers: adminUsersSlice.reducer,
    adminProducts: adminProductSlice.reducer,
    adminCategories: adminCategoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
