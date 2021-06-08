import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import { ThemeProvider } from "styled-components";

import Home from "./screen/Home";
import Login from "./screen/Login";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import SignUp from "./screen/SignUp";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? (
                    <Home />
                ) : (
                  <Login />
                )}
              </Route>
              <Route path={routes.signUp} exact>
                <SignUp />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
