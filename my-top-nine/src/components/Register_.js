import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

import { TopNineContext } from "../contexts/TopNineContext";
import { register } from "../utils/api";

import registerbg from "../images/register-bg1.svg";

const RegisterWrapper = styled.div`
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
    background: url(${registerbg});
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

const Register = props => {
  const { dispatch } = useContext(TopNineContext);

  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    name: "",
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

    if (!(data.name && data.password && data.email)) {
      setMessage("You must supply a name, email address, and password!");
    } else {
      register(data, dispatch, setMessage);
    }
  };

  // if we successfully logged in, go to top nine list display
  if (localStorage.getItem("MTN-token")) {
    return <Redirect to='/topnine' />;
  }

  return (
    <RegisterWrapper>
      <div className='side-msg'>
        <p>Let's Get Started!</p>
      </div>
      <div>
        <h3>Register Page</h3>

        <p className='message'>{message}</p>

        <form onSubmit={handleSubmit}>
          <label name='name'>
            <span>Name:</span>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={data.name}
              onChange={handleChange}
            />
          </label>
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
          <Button color='primary'>Register</Button>
          {/* <button type='submit'>Register</button> */}
        </form>
      </div>
    </RegisterWrapper>
  );
};

export default Register;
