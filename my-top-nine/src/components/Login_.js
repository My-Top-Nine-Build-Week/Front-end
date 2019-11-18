import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { TopNineContext } from '../contexts/TopNineContext';
import { login } from '../utils/api';


const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	text-align: center;

	h3 {
		font-size: 2.6rem;
		margin: 20px;
	}

	.message {
		font-size: 2rem;
		color: red;
	}

	.info {
		font-size: 2rem;
		color: red;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 350px;
		margin-top: 10px;
		padding: 10px;
		border: 2px solid grey;
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
		background-color: #AAA;
		color: black;
		border: none;
		border-radius: 5px;
		width: 60px;
		font-size: 1.4rem;
		margin-top: 10px;

		&:hover {
			cursor: pointer;
			background-color: grey;
			color: white;
		}
	}
`;


const Login = (props) => {

	const { dispatch } = useContext(TopNineContext);

	const [message, setMessage] = useState('');

	const [data, setData] = useState({
		email: '',
		password: ''
	});


	const handleChange = (e) => {
		setData({
			...data, [e.target.name]: e.target.value
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		setMessage('');

		if (!(data.password && data.email)) {
			setMessage('You must supply an email address and password!');
		} else {
			setMessage('');
			login(data, dispatch, setMessage);
		}
	};


	// if we successfully logged in, go to top nine list display
	if (localStorage.getItem('MTN-token')) {
		return  (<Redirect to='/topnine' />);
	}

	return (
		<LoginWrapper>
			<h3>Login Page</h3>

			<div className='message'>{message}</div>

			<form onSubmit={handleSubmit}>

				<label name='email'><span>Email:</span>
					<input type='text' name='email' placeholder='Email'
						value={data.email} onChange={handleChange} />
				</label>
				<label name='password'><span>Password:</span>
					<input type='password' name='password' placeholder='Password'
						value={data.password} onChange={handleChange} />
				</label>

				<button type='submit'>Log In</button>
			</form>
		</LoginWrapper>
	);

};

export default Login;