import { type FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

type BannerProps = {
  background: string;
  path: string;
  quote: string;
};

const Banner: FC<BannerProps> = ({ background, path, quote }) => {
  return (
    <Wrapper className={background}>
      <div className="banner--center content--center">
        {/* <img src={img} alt={path} className="banner__img" /> */}
        <div className="banner__info">
          <h5 className="banner__path">
            <Link to="/">home |</Link>{" "}
            <span className="banner__path">{path}</span>
          </h5>
          <p className="banner__quote">
            <FaQuoteLeft />
            {"  "}
            {quote} {"  "}
            <FaQuoteRight />
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  height: 200px;
  display: grid;
  place-items: center;
  text-align: center;
  .banner__path {
    margin-bottom: 1rem;
    color: var(--primary-200);
    font-size: 2rem;
    text-transform: capitalize;
    letter-spacing: 3px;
    span {
      color: var(--white);
    }
  }
  .banner__quote {
    position: relative;
    color: var(--primary-200);
    letter-spacing: var(--letter-spacing-2);
    svg {
      color: var(--white);
    }
  }
`;
