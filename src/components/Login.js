import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CredentialsContext from "../store/CredentialsContext";

const Login = () => {
    const [userInput, setUserInput] = useState({
      username: "",
      password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const credentialsCtx = useContext(CredentialsContext)
  
    const addUsernameHandler = (e) => {
      setUserInput((prevState) => {
        return { ...prevState, username: e.target.value };
      });
    };
    const addPasswordHandler = (e) => {
      setUserInput((prevState) => {
        return { ...prevState, password: e.target.value };
      });
    };
  
    const onSubmitHandler = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`http://localhost:4000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        if (!response.ok) {
          const message = await response.json();
          throw new Error(message.message);
        } else {
          const data = await response.json();
          credentialsCtx.setCredentialsState(data)
          navigate("/");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setUserInput({
        username: "",
        password: "",
      });
    };
  
  
    return (
      <div>
        <Link to="/">Home</Link>
        {errorMessage && <p>{errorMessage}</p>}
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler}>
          <input
            value={userInput.username}
            onChange={addUsernameHandler}
            placeholder="username"
          />
          <br />
          <input
            type="password"
            value={userInput.password}
            onChange={addPasswordHandler}
            placeholder="password"
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

export default Login