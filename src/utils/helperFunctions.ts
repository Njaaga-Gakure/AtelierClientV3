import { jwtDecode, type JwtPayload } from "jwt-decode";
import { User } from "../features/user/userSlice";

interface CustomJwtPayload extends JwtPayload {
  role: string;
  name: string;
  email: string;
}

export const setUserToLocalStorage = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = (): User | null => {
  const user: string | null = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem("user");
};

export const getClaimFromToken = (token: string): CustomJwtPayload => {
  const payload: CustomJwtPayload = jwtDecode(token);
  return payload;
};

export const priceFormatter = (price: number) => {
  const formatter = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  });

  return formatter.format(price);
};

export const pageNumbers = (count: number): number[] => {
  const pagesCount = Math.ceil(count / 10);
  return Array.from({ length: pagesCount }, (_, index) => index + 1);
};
