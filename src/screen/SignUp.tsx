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
    $avatarURL: Upload
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      avatarURL: $avatarURL
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
    const {
      username,
      password,
      name,
      email,
      location,
      avatarURL,
      githubUsername,
    } = getValues();
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
    console.log("@@@@@@@@@@@@@@@@@@@");
    console.log(data);
    console.log({
      ...data,
      avatarURL: data.avatarURL[0],
    });
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
        avatarURL: data.avatarURL[0],
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
              required: "????????? ????????? ????????? ?????????.",
              minLength: {
                value: 5,
                message: "????????? ????????? 5?????? ???????????? ????????? ?????????.",
              },
              // validate: (currentValue: any) => currentValue.includes("potato")
            })}
            name="username"
            type="text"
            placeholder="????????? ??????"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "??????????????? ???????????????.",
            })}
            name="password"
            type="password"
            placeholder="????????????"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Input
            ref={register({
              required: "????????? ???????????????.",
            })}
            name="name"
            type="text"
            placeholder="??????"
            hasError={Boolean(errors?.name?.message)}
          />
          <FormError message={errors?.name?.message} />
          <Input
            ref={register({
              required: "????????? ????????? ???????????????.",
            })}
            name="email"
            type="text"
            placeholder="????????? ??????"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />

          <Input
            ref={register}
            name="location"
            type="text"
            placeholder="??????"
          />
          <Input
            ref={register}
            name="avatarURL"
            type="file"
            placeholder="???????????????"
          />
          <Input
            ref={register}
            name="githubUsername"
            type="text"
            placeholder="????????? ????????? ??????"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <SubtitleSmall>
          ???????????? Instagram??? <strong>??????</strong>,{" "}
          <strong>????????? ??????</strong> ??? <strong>?????? ??????</strong>??? ????????????
          ?????????.
        </SubtitleSmall>
      </FormBox>
      <BottomBox
        cta="????????? ????????????????"
        linkText="?????????"
        link={routes.home}
      />
      {/* <Mutation mutation={UPLOAD_FILE_STREAM}>
        {(singleUploadStream, { data, loading }) => {
          console.log(data);
          return (
            <form
              onSubmit={() => {
                console.log("Submitted");
              }}
              encType={"multipart/form-data"}
            >
              <input
                name={"document"}
                type={"file"}
                onChange={({ target: { files } }) => {
                  const file = files[0];
                  file && singleUploadStream({ variables: { file: file } });
                }}
              />
              {loading && <p>Loading.....</p>}
            </form>
          );
        }}
      </Mutation> */}
    </AuthLayout>
  );
};

export default SignUp;
