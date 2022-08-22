import React from "react";
import "../css/Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <div className="login">
        <div className="login_container">
          <img
            src="https://seeklogo.com/images/W/whatsapp-logo-33F6A82887-seeklogo.com.png"
            alt=""
          />
          <div className="login_text">
            <h1>Sign in to Whatsapp Clone</h1>
          </div>
          <Button onClick={signIn}>Sign in with Goggle</Button>
        </div>
      </div>
    </>
  );
};

export default Login;
