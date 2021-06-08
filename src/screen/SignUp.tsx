import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import Separator from "../components/auth/Separator";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router";

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

const SubtitleSmall = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: rgb(142, 142, 142);
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String
    $password: String!
    # $avatarURL: Upload
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      # avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }

    history.push(routes.home, {
      message: "Account created. Pleasw log in.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <Subtitle>NOMAD COFFEE</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "사용자 이름을 입력해 주세요.",
              minLength: {
                value: 5,
                message: "사용자 이름을 5글자 이상으로 입력해 주세요.",
              },
              // validate: (currentValue: any) => currentValue.includes("potato")
            })}
            name="username"
            type="text"
            placeholder="사용자 이름"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "비밀번호를 입력하세요.",
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Input
            ref={register({
              required: "이름을 입력하세요.",
            })}
            name="name"
            type="text"
            placeholder="이름"
            hasError={Boolean(errors?.name?.message)}
          />
          <FormError message={errors?.name?.message} />
          <Input
            ref={register({
              required: "이메일 주소를 입력하세요.",
            })}
            name="email"
            type="text"
            placeholder="이메일 주소"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />

          <Input ref={register} name="location" type="text" placeholder="주소" />
          <Input ref={register} name="avatarURL" type="text" placeholder="프로필사진" />
          <Input ref={register} name="githubUsername" type="text" placeholder="깃허브 사용자 이름" />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <SubtitleSmall>
          가입하면 Instagram의 <strong>약관</strong>,{" "}
          <strong>데이터 정책</strong> 및 <strong>쿠키 정책</strong>에 동의하게
          됩니다.
        </SubtitleSmall>
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;
