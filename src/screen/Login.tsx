import { useLocation } from "react-router";
import { logUserIn } from "../apollo";

const Login = () => {
  // HashRouter의 경우 useLocation으로 state 이동이 안됨. browserRouter로 변경해야함.
  return (
    <div>
      <h1>Login page</h1>
      <button onClick={logUserIn}>Log in now!</button>
    </div>
  );
};

export default Login;
