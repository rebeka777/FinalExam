import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  max-width: 350px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 576px) {
    max-width: 100%;
    padding: 10px;
  }
`;

export const H1 = styled.h1`
  text-align: center;
  color: #9851d6;
  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  margin-bottom: 5px;
  padding: 10px;
  width: 100%;

  @media (max-width: 576px) {
    margin-bottom: 2px;
    padding: 2px;
  }
`;

export const Label = styled.label`
  margin-left: 10px;
  margin-right: 0px;
  font-weight: bolder;
  width: 100%;

  @media (max-width: 576px) {
    margin: 5px;
  }
`;

export const Button = styled.button`
  background-color: #9851d6;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: green;
  }

  @media (max-width: 576px) {
    padding: 8px 12px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;

  @media (max-width: 576px) {
    margin-top: 5px;
    font-size: 14px;
  }
`;
