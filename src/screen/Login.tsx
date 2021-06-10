import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

interface LocationState {
  message: any;
  username: any;
  password: any;
  result: any;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  // HashRouter의 경우 useLocation으로 state 이동이 안됨. browserRouter로 변경해야함.
  const location: any = useLocation();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<LocationState>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { ok, error, token },
      } = data;

      if (!ok) {
        setError("result", {
          message: error,
        });
      }
      if (token) {
        logUserIn(token);
      }
    },
  });

  const clearLoginError = () => {
    clearErrors("result");
  };

  const onSubmitValid = (data: any) => {
    //console.log(data);
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const onSubmitInvalid = (data: any) => {
    //console.log(data, "invalid");
  };
  // console.log(formState);

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <HeaderContainer>
          <Subtitle>NOMAD COFFEE</Subtitle>
        </HeaderContainer>
        <Notification> {location?.state?.message} </Notification>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            ref={register({
              required: "사용자 이름을 작성해 주세요.",
              minLength: {
                value: 5,
                message: "사용자 이름을 5글자 이상으로 작성해 주세요.",
              },
              // validate: (currentValue: any) => currentValue.includes("potato")
            })}
            name="username"
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "비밀번호를 작성해 주세요.",
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginError}
          />

          <FormError message={errors?.password?.message} />
          <Button type="submit" value="Log in" disabled={!formState.isValid} />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="계정이 없으신가요?"
        linkText="가입하기"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
