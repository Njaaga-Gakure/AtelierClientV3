import { type ChangeEvent, type FC } from "react";
import styled from "styled-components";

type FormRowProps = {
  name: string;
  type: string;
  label?: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormRow: FC<FormRowProps> = ({
  name,
  label,
  type,
  value,
  handleChange,
}) => {
  return (
    <Wrapper>
      <label htmlFor={name} className="form__label">
        {label ? label : name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="form__input"
        onChange={handleChange}
        value={value}
      />
    </Wrapper>
  );
};

export default FormRow;

const Wrapper = styled.div`
  .form__label {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing-1);
    font-size: 0.8rem;
    text-transform: capitalize;
  }
  .form__input {
    margin-top: 0.25rem;
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: var(--border-radius-2);
    background: transparent;
    border: 1px solid var(--black);
    outline-color: var(--primary-500);
  }
`;
