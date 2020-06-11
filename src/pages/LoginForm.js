import React, { useState } from "react";
import axios from "axios";
import { storeToken, storeStaff } from "../Auth";
import { HOST } from "../Url";
import { Icon, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import { Box } from "rebass";
import Api from '../services/api';

const LoginForm = () => {
  const [loggedIn, updateLoggedIn] = useState(false);
  const [email, updateEmail] = useState(undefined);
  const [password, updatePassword] = useState(undefined);

  const handleLogin = () => {
    Api.signIn({data: { email: email, password: password }}, onSuccess, onFailure)
  }

  const onSuccess = (response) => {
    storeToken(response.data['user_token']);
    storeStaff("USER_ID", response.data["user"]["id"]);
    storeStaff("USER_NAME", response.data["user"]["name"]);
    storeStaff("USER_EMAIL", response.data["user"]["email"]);
    updateLoggedIn(true);
    window.location.href = '/users'
  }

  const onFailure = (error) => {
    if (error.response && error.response.data) {
      message.error(error.response.data['message'])
    }
    console.log(error);
  }

  const handleSubmit = () => {
    if (!email || !is_valid_email(email)) {
      message.error('Enter valid email')
      return
    }
    else if (!password || password.length < 6) {
      message.error('Enter valid password')
      return
    }
    handleLogin()
  };

  const is_valid_email = (email) => { 
    return /^.+@.+\..+$/.test(email); 
  }

  const changeUserName = (e) => {
    updateEmail(e.target.value);
  };

  const changePassword = (e) => {
    updatePassword(e.target.value);
  };

  if (loggedIn) {
    return <Redirect to={"/users"} />;
  }

  return (
    <Box px="20px">
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="email"
        onChange={changeUserName}
        style={{ height: 45 }}
      />
      <br />
      <br />
      <Input.Password
        type="password"
        placeholder="password"
        onChange={changePassword}
        style={{ height: 45 }}
      />
      <br />
      <br />
      <Button type='primary' block onClick={handleSubmit}>Login</Button>
    </Box>
  );
};

export default LoginForm;
