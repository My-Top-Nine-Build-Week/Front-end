import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

import { TopNineContext } from "../contexts/TopNineContext";
import { login } from "../utils/api";

import loginbg from "../images/login-bg.svg";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 200px;
  text-align: center;
  width: 70%;
  height: 250px;

  h3 {
    font-size: 2.6rem;
    margin: 20px;
  }

  .message {
    font-size: 2rem;
    color: red;
  }

  .side-msg {
    height: 100%;
    width: 50%;
    background: url(${loginbg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .side-msg p {
    margin: 60px auto;
    font-size: 4rem;
    color: white;
  }

  div {
    width: 50%;
    height: 100%;
  }

  .info {
    font-size: 2rem;
    color: red;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
  }

  label {
    font-size: 1.4rem;
    font-style: italic;
  }

  span {
    display: inline-block;
    text-align: right;
    width: 80px;
    margin-right: 5px;
  }

  input {
    font-size: 1.4rem;
    margin: 5px;
    padding: 5px;
  }

  button {
    height: 28px;
    color: #fff;
    border: none;
    border-radius: 5px;
    width: 90px;
    font-size: 1.4rem;
    margin-top: 10px;

    &:hover {
      cursor: pointer;
      background-color: grey;
      color: white;
    }
  }
`;

const Login = props => {
  const { dispatch } = useContext(TopNineContext);

  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage("");

    if (!(data.password && data.email)) {
      setMessage("You must supply an email address and password!");
    } else {
      setMessage("");
      login(data, dispatch, setMessage);
    }
  };

  // if we successfully logged in, go to top nine list display
  if (localStorage.getItem("MTN-token")) {
    return <Redirect to='/topnine' />;
  }

  return (
    <LoginWrapper>
      <div className='side-msg'>
        <p>Welcome Back!</p>
      </div>
      <div>
        <h3>Login Page</h3>

        <p className='message'>{message}</p>

        <form onSubmit={handleSubmit}>
          <label name='email'>
            <span>Email:</span>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={data.email}
              onChange={handleChange}
            />
          </label>
          <label name='password'>
            <span>Password:</span>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={data.password}
              onChange={handleChange}
            />
          </label>
          <Button color='primary'>Log In</Button>
          {/* <button type='submit'>Log In</button> */}
        </form>
      </div>
    </LoginWrapper>
  );
};

export default Login;
