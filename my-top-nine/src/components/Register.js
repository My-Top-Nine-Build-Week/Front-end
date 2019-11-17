import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { TopNineContext } from '../contexts/TopNineContext';
import { register } from '../utils/api';
import { REGISTER_FAILURE, REGISTER_SUCCESS } from '../reducers/topNineReducer';


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
		width: 80px;
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
		setError('');

		if (!(data.name && data.password && data.email)) {
			setError('You must supply a name, email address, and password!');
		} else {
			register(data, dispatch);
		}
	};


	return (
		<RegisterWrapper>
			<h3>Register Page</h3>

			{error && <div className='error'>{error}</div>}
			{(topNineState.apiAction === REGISTER_SUCCESS) &&
				<div className='info'>Successfully registered...you can login now</div>}
			{(topNineState.apiAction === REGISTER_FAILURE) && <div className='info'>{topNineState.apiMessage}</div>}

			<form onSubmit={handleSubmit}>

				<label name='name'><span>Name:</span>
					<input type='text' name='name' placeholder='Name'
						value={data.name} onChange={handleChange} />
				</label>
				<label name='email'><span>Email:</span>
					<input type='text' name='email' placeholder='Email'
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
