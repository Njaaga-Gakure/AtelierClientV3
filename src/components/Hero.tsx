import styled from "styled-components";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { useAppSelector } from "../store/hooks";

const Hero = () => {
  const { user } = useAppSelector((store) => store.user);
  let role: string = "";
  if (user) {
    role = user.role;
  }
  return (
    <Wrapper>
      <div className="hero__info">
        <h2 className="hero__tagline">
          <span>Your Imagination,</span>
          Our Canvas.
        </h2>
        <p className="hero__description">
          Elevate your space with curated masterpieces. Bid, win, and adorn your
          world with artistry.
        </p>
        <SocialLinks />
        <div className="hero__buttons">
          <Link to="/gallery" className="btn">
            explore gallery
          </Link>
          {role === "seller" && (
            <Link to="/sell" className="btn hero__btn">
              sell art work
            </Link>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;
const Wrapper = styled.section`
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.7)
    ),
    url("/hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: calc(100vh - 4rem);
  display: grid;
  place-items: center;
  padding: 0 2rem;

  .hero__tagline,
  .hero__description {
    letter-spacing: var(--letter-spacing-1);
    color: var(--white);
    text-align: center;
  }
  .hero__tagline {
    margin-bottom: 1rem;
    span {
      color: var(--primary-500);
      display: block;
    }
  }
  .hero__social {
    padding: 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .social__link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-300);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid var(--primary-300);
    transition: var(--transition);
    &:hover {
      color: var(--white);
      background-color: var(--primary-300);
    }
  }
  .hero__buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hero__btn {
    background: var(--white);
    color: var(--primary-500);
  }
  .hero__btn:hover {
    background-color: var(--primary-200);
  }
  @media (min-width: 500px) {
    .hero__buttons {
      flex-direction: row;
    }
  }
`;
