import styled from "styled-components";
import Header from "./Header";
import CategoriesGrid from "./CategoriesGrid";

const Categories = () => {
  return (
    <Wrapper>
      <div className="categories--center content--center">
        <Header
          title="categories"
          description="Unleash the Artistic Spectrum in Our Categories Section"
        />
        <CategoriesGrid />
      </div>
    </Wrapper>
  );
};

export default Categories;

const Wrapper = styled.section`
  min-height: 100vh;
  padding-bottom: 5rem;
`;
