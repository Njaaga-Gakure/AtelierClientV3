import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormRow, Loading } from "../components";
import styled from "styled-components";
import FormSelectRow from "../components/FormSelectRow";
import { login, register } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, user: authenticatedUser } = useAppSelector(
    (store) => store.user
  );
  const dispatch = useAppDispatch();
  const [isMember, setIsMember] = useState<boolean>(false);

  useEffect(() => {
    if (authenticatedUser) {
      const { role } = authenticatedUser;
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin-panel");
        } else {
          navigate("/");
        }
      }, 3000);
    }
  }, [authenticatedUser, navigate]);
  const userInitialState: User = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Bidder",
  };
  const [user, setUser] = useState<User>(userInitialState);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber, password, role } = user;
    if (
      !email ||
      !password ||
      (!isMember && (!firstName || !lastName || !phoneNumber || !role))
    ) {
      toast.error("Please fill out all the fields");
      return;
    }
    if (!isMember) {
      dispatch(
        register({ firstName, lastName, email, phoneNumber, password, role })
      );
    } else {
      dispatch(login({ email, password }));
    }
    setUser(userInitialState);
  };
  return (
    <Wrapper className="register">
      <div className="register__banner">
        <div>
          <h2 className="register__tagline">
            <span>
              Your Imagination, <br />
            </span>
            Our Canvas.
          </h2>
          <p className="register__description">
            Elevate your space with curated masterpieces. Bid, win, and adorn
            your world with artistry.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="register__form">
        <h5 className="form__title">{isMember ? "Login" : "Register"}</h5>
        {!isMember && (
          <FormRow
            name="firstName"
            label="first name"
            type="text"
            value={user.firstName}
            handleChange={handleChange}
          />
        )}
        {!isMember && (
          <FormRow
            name="lastName"
            label="last name"
            type="text"
            value={user.lastName}
            handleChange={handleChange}
          />
        )}
        <FormRow
          name="email"
          type="email"
          value={user.email}
          handleChange={handleChange}
        />
        {!isMember && (
          <FormRow
            name="phoneNumber"
            label="phone number"
            type="text"
            value={user.phoneNumber}
            handleChange={handleChange}
          />
        )}
        <FormRow
          name="password"
          type="password"
          value={user.password}
          handleChange={handleChange}
        />
        {!isMember && (
          <FormSelectRow
            name="role"
            label="bidder/seller"
            options={["Bidder", "Seller"]}
            value={user.role}
            handleChange={handleChange}
          />
        )}
        <button
          className="btn btn--secondary btn--dark btn--block form__btn"
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : isMember ? "Login" : "Register"}
        </button>
        {isMember ? (
          <p className="form__fine-print">
            Not a member?{" "}
            <button
              type="button"
              onClick={() => setIsMember(!isMember)}
              className="member__btn"
            >
              Register
            </button>
          </p>
        ) : (
          <p className="form__fine-print">
            Already a member?{" "}
            <button
              type="button"
              onClick={() => setIsMember(!isMember)}
              className="member__btn"
            >
              Login
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.main`
  display: grid;
  gap: 2rem;
  padding-bottom: 5rem;
  /* Banner */
  .register__banner {
    padding: 2rem;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.5)
      ),
      url("/register-bg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .register__tagline,
  .register__description {
    letter-spacing: var(--letter-spacing-1);
    color: var(--white);
    text-align: center;
  }
  .register__tagline {
    margin-bottom: 1rem;
    span {
      color: var(--primary-400);
    }
  }
  /* Form  */
  .register__form {
    display: grid;
    gap: 0.5rem;
    width: 80vw;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: var(--shadow-1);
    padding: 2rem;
    border-radius: var(--border-radius-3);
  }
  .form__title {
    text-align: center;
    color: var(--primary-700);
    letter-spacing: var(--letter-spacing-2);
  }
  .form__btn {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .form__btn:hover .spinner {
    border: 2px solid var(--white);
    border-top: 2px solid var(--primary-500);
  }
  .form__fine-print {
    text-align: center;
    letter-spacing: 1px;
    margin-top: 0.5rem;
  }
  .member__btn {
    background-color: transparent;
    border: none;
    letter-spacing: var(--letter-spacing-1);
    color: var(--primary-500);
  }
  .member__btn:hover {
    color: var(--primary-300);
  }
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 0;
    .register__banner {
      display: grid;
      place-items: center;
      min-height: 100vh;
    }
    .register__form {
      margin: 2rem 0;
      align-self: center;
    }
  }
`;
