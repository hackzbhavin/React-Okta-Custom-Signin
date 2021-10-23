import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useOktaAuth } from "@okta/okta-react";
import LoginInvalidAlert from "../Components/Reusable/LoginInvalid";
import {  useHistory } from 'react-router-dom';


export default function LoginPage() {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState(false);
  const history = useHistory();

console.log(sessionToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    oktaAuth
      .signInWithCredentials({ username, password })
      .then((values) => {
        const sessionToken = values.sessionToken;
        setSessionToken(sessionToken);
        console.log("Inside", sessionToken);
        
        oktaAuth.signInWithRedirect({ sessionToken });
        history.push('/dashboard')

      })
      .catch((err) => {
        setErrorMessage(true);
        
      })
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      ErrorMessage && setErrorMessage(!ErrorMessage);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [ErrorMessage]);



  return (
    <Layout>
              {ErrorMessage && (
<LoginInvalidAlert

/>
      )}
      <form className="container p-5 w-60">
        <div className="form-group">
          <label >Email address / User Id</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={username}
            onChange={handleUsernameChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            id="exampleInputPassword1"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary mt-3"
        >
          Log In
        </button>
      </form>
    </Layout>
  );
}
