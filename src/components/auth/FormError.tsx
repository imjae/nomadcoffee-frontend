import styled from "styled-components";

const StyledFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

const FormError = ({ message }: { message: any }) => {
  return message === "" || !message ? null : <StyledFormError>{message}</StyledFormError>;
};

export default FormError;
