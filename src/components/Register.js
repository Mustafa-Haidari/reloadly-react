import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await fetch(`http://localhost:4000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      if (!response.ok) {
        const message = await response.json()
        throw new Error(message.message);
      } else {
        const data = await response.json();
        navigate('/')
        console.log(data);
      }
    } catch (error) {
        setErrorMessage(error.message);
    }
    setUserInput({
        username: '',
        password: ''
    })
  };

  const navigate = useNavigate()

  return (
    <div>
      <Link to="/">Home</Link>
      {errorMessage && <p>{errorMessage}</p>}
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
