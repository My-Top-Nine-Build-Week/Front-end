import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { TopNineContext } from '../contexts/TopNineContext';

import { register } from '../utils/api';


const RegisterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	text-align: center;

	h3 {
		font-size: 2.6rem;
		margin: 20px;
	}

	.error {
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


const Register = (props) => {

	// dispatcher for register function
	const { topNineState, dispatch } = useContext(TopNineContext);

	const [error, setError] = useState();

	const [data, setData] = useState({
		name: '',
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

		if (!(data.name && data.password && data.email)) {
			setError('You must supply a name, email address, and password!');
		} else {
			register(data, setError, dispatch);
		}
	};


	// if we successfully registered, go to login display
	/*
	if ( topNineState.apiError === '' && topNineState.apiInProgress === false) {
		return  (<Redirect to='/login' />);
	}
	*/

	return (
		<RegisterWrapper>
			<h3>Register Page</h3>

			{error && <div className='error'>{error}</div>}

			<form onSubmit={handleSubmit}>

				<label name='name'><span>Name:</span>
					<input type='text' name='name' placeholder='Name'
						value={data.name} onChange={handleChange} />
				</label>
				<label name='email'><span>Email:</span>
					<input type='email' name='email' placeholder='Email'
						value={data.email} onChange={handleChange} />
				</label>
				<label name='password'><span>Password:</span>
					<input type='password' name='password' placeholder='Password'
						value={data.password} onChange={handleChange} />
				</label>

				<button type='submit'>Register</button>
			</form>
		</RegisterWrapper>
	);

};

export default Register;
