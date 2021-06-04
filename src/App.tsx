import { useReactiveVar } from "@apollo/client";

import { isLoggedInVar, darkModeVar, client, enableDarkMode, disableDarkMode } from "./apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { ThemeProvider } from "styled-components";
import Home from "./screen/Home";
import Login from "./screen/Login";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home/> : <Login />}
          </Route>
        </Switch>
          <button onClick={darkMode ? disableDarkMode : enableDarkMode}> {(darkMode) ? "lightMode!" : "darkMode!"} </button>
      </Router>
    </ThemeProvider>
  );
}

export default App;
