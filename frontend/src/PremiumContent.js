import React from "react";
import { getUser, resetUserSession } from "./service/AuthService";

const PremiumContent = (props) => {
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";

  const logoutHandler = () => {
    resetUserSession();
    props.history.push("/login"); //if logout we dont wanna show them premium page
  };
  //user from session token
  return (
    <div>
      Hello {name} ! you have been logged in!! Welcome <br />
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  );
};

export default PremiumContent;
