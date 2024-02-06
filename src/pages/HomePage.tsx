import { Hero } from "../components";
import { Categories, Recent } from "../components";

export const HomePage = () => {
  return (
    <main className="home">
      <Hero />
      <Recent />
      <Categories />
    </main>
  );
};

export default HomePage;
