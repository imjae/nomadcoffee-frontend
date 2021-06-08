import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

const AuthLayout = ({ children }: any) => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default AuthLayout;