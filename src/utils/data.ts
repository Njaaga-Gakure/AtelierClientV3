import art1 from "../assets/art-1.jpg";
import art2 from "../assets/art-2.jpg";
import art3 from "../assets/art-3.jpg";
import art4 from "../assets/art-4.jpg";
import art6 from "../assets/art-6.jpg";

export type navLink = {
  id: number;
  link: string;
  path: string;
};

export const navLinks: navLink[] = [
  {
    id: 1,
    link: "home",
    path: "/",
  },
  {
    id: 2,
    link: "about us",
    path: "/about",
  },
  {
    id: 3,
    link: "gallery",
    path: "/gallery",
  },
  {
    id: 4,
    link: "my auctions",
    path: "/sell/view-auctioned-items",
  },
  {
    id: 5,
    link: "my orders",
    path: "/orders",
  },
];

export const categories = [
  { id: 1, name: "classical", img: art1 },
  { id: 2, name: "portraits", img: art2 },
  { id: 3, name: "realism", img: art3 },
  { id: 4, name: "abstract", img: art4 },
  { id: 5, name: "contemporary", img: art6 },
];
