import React, { useState } from "react";
import axios from "axios";

const registerUrl =
  " https://s9tme76mge.execute-api.eu-central-1.amazonaws.com/BU2_Ecommerce/register";

/*
 ** IMPORTANT change this URL to your AWS Api register URL
 */
const Register = () => {
  const [typeId, setTypeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      typeId === "" ||
      username === "" ||
      email === "" ||
      name === "" ||
      password === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": "O8vHCdfPJQ3kdEsvIEUZh4OSgfOgomIZ8beWa0uP",
      },
    };

    const requestBody = {
      typeId: typeId,
      username: username,
      email: email,
      name: name,
      password: password,
    };
    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registeration Successful");
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        typeId:{" "}
        <input
          type="text"
          value={typeId}
          onChange={(event) => setTypeId(event.target.value)}
        ></input>{" "}
        <br />
        name:{" "}
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>{" "}
        <br />
        email:{" "}
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>{" "}
        <br />
        username:{" "}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>{" "}
        <br />
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>{" "}
        <br />
        <input type="submit" value="Register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
