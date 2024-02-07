import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "../../utils/axios";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";

type addProductResponse = {
  errorMessage: string;
  result: string;
};

export type FilteredProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  sellerId: string;
  category: string;
  status: string;
  startTime: Date;
  endTime: Date;
  startPrice: number;
  currentHighestBid: number;
  bids: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  sellerId: string;
  categoryId: string;
  status: string;
  startTime: Date;
  endTime: Date;
  startPrice: number;
  currentHighestBid: number;
  bids: number;
};
export type AddProductRequest = {
  name: string;
  description: string;
  image: string;
  categoryId: string;
  endTime: Date;
  startPrice: Number;
};
type AllProductsResponse = {
  errorMessage: string;
  count: number;
  products: Product[];
};
type FilteredProductsResponse = {
  errorMessage: string;
  count: number;
  products: FilteredProduct[];
};
type SingleProductResponse = {
  errorMessage: string;
  product: FilteredProduct;
};

type ProductState = {
  isLoading: boolean;
  isError: boolean;
  allProducts: Product[];
  filteredProducts: FilteredProduct[];
  sellerProducts: FilteredProduct[];
  sellerProductsCount: number;
  sellerPageNumber: number;
  singleProduct: FilteredProduct | null;
  pageNumber: number;
  productCount: number;
  sortOptions: string[];
  categoryOptions: string[];
};

export type changeObj = {
  name: string;
  value: string;
};
type ProductFilters = {
  search: string;
  category: string;
  sort: string;
};
const productFilters: ProductFilters = {
  search: "",
  category: "all",
  sort: "all",
};

const initialState: ProductState & ProductFilters = {
  isLoading: false,
  isError: false,
  allProducts: [],
  filteredProducts: [],
  sellerProductsCount: 0,
  sellerProducts: [],
  singleProduct: null,
  sellerPageNumber: 1,
  productCount: 0,
  pageNumber: 1,
  sortOptions: ["a-z", "z-a", "highest-bid-asc", "highest-bid-desc"],
  categoryOptions: [
    "all",
    "classical",
    "portraits",
    "realism",
    "abstract",
    "contemporary",
  ],
  ...productFilters,
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productRequest: AddProductRequest, thunkAPI) => {
    try {
      const { data } = await customAxios.post("api/product", productRequest);
      console.log(data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.errorMessage || "An Error Occurred :("
        );
      }
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get("api/product/details");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.errorMessage || "An Error Occurred :("
        );
      }
    }
  }
);
export const fetchFilteredProducts = createAsyncThunk<
  FilteredProductsResponse,
  void,
  { state: RootState }
>("products/getFilteredProducts", async (_, thunkAPI) => {
  try {
    const { pageNumber, sort, category, search } = thunkAPI.getState().product;
    let url: string = `api/product?pageNumber=${pageNumber}&sort=${sort}&category=${category}`;
    if (search) {
      url = `${url}&search=${search}`;
    }
    const { data } = await customAxios.get(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data.errorMessage || "An Error Occurred :("
      );
    }
  }
});

export const fetchSellerProducts = createAsyncThunk<
  FilteredProductsResponse,
  void,
  { state: RootState }
>("products/getSellerProducts", async (_, thunkAPI) => {
  try {
    const { sellerPageNumber } = thunkAPI.getState().product;
    const { data } = await customAxios.get(
      `api/product/seller-products?pageNumber=${sellerPageNumber}`
    );
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data.errorMessage || "An Error Occurred :("
      );
    }
  }
});
export const fetchSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(`api/product/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.errorMessage || "An Error Occurred :("
        );
      }
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleFiltersChange(
      state,
      { payload: { name, value } }: PayloadAction<changeObj>
    ) {
      type Name = "search" | "category" | "sort";
      state.pageNumber = 1;
      state[name as Name] = value;
    },
    clearFilters(state) {
      state.search = "";
      state.category = "all";
      state.sort = "all";
    },
    changePage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    changeSellerAuctionsPage(state, action: PayloadAction<number>) {
      state.sellerPageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<addProductResponse>) => {
          state.isLoading = false;
          toast.success(action.payload.result);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "An Error Occurred :("
        );
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<AllProductsResponse>) => {
          state.isLoading = false;
          state.allProducts = action.payload.products;
        }
      )
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchFilteredProducts.fulfilled,
        (state, action: PayloadAction<FilteredProductsResponse>) => {
          state.isLoading = false;
          state.productCount = action.payload.count;
          state.filteredProducts = action.payload.products;
        }
      )
      .addCase(fetchFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<SingleProductResponse>) => {
          state.isLoading = false;
          state.singleProduct = action.payload.product;
        }
      )
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchSellerProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchSellerProducts.fulfilled,
        (state, action: PayloadAction<FilteredProductsResponse>) => {
          state.isLoading = false;
          state.sellerProductsCount = action.payload.count;
          state.sellerProducts = action.payload.products;
        }
      )
      .addCase(fetchSellerProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  handleFiltersChange,
  clearFilters,
  changePage,
  changeSellerAuctionsPage,
} = productSlice.actions;
