import React, { useState } from "react";
import CredentialsContext from "./CredentialsContext";

const CredentialsProvider = (props) => {
    const [credentialsState, setCredentialsState] = useState({
      username: '',
      password: ''
    })

    const credentials = {
      credentialsState: credentialsState,
      setCredentialsState: setCredentialsState
    }

  return (
    <CredentialsContext.Provider value={credentials}>
      {props.children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsProvider;
