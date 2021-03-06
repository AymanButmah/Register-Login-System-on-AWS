import { BrowserRouter, NavLink, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PremiumContent from "./PremiumContent";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

const verifyTokenAPIURL =
  "https://s9tme76mge.execute-api.eu-central-1.amazonaws.com/BU2_Ecommerce/verify";
/*
 ** IMPORTANT change this URL to your AWS Api verify URL
 */

function App() {
  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }
    const requestConfig = {
      headers: {
        "x-api-key": "O8vHCdfPJQ3kdEsvIEUZh4OSgfOgomIZ8beWa0uP",
        /*
         ** Change api-key >> its autogenerated from aws console -> api gateway
         */
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestConfig, requestBody)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenicating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenicating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClass="active" to="/">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink activeClass="active" to="/register">
            {" "}
            Register{" "}
          </NavLink>
          <NavLink activeClass="active" to="/login">
            {" "}
            Login{" "}
          </NavLink>
          <NavLink activeClass="active" to="/premium-content">
            {" "}
            Premium Content{" "}
          </NavLink>
        </div>
        <div className="content">
          <switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/premium-content"
              component={PremiumContent}
            />
          </switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
