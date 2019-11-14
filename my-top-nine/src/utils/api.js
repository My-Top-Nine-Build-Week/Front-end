import axios from 'axios';

import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGOUT
} from '../reducers/topNineReducer';


export const baseURL = 'https://salty-stream-78442.herokuapp.com';


export const getToken = () => {
	return localStorage.getItem('MTN-token');
};


export const clearToken = () => {
	return localStorage.removeItem('MTN-token');
};


export const setToken = (token) => {
	return localStorage.setItem('MTN-token', token);
};


export const apiWithAuth = () => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getToken()
		}
	});
};


export const login = (credentials, errorSetter, dispatch) => {

	dispatch({ type: LOGIN_START });
	axios.post(`${baseURL}/auth/login`, credentials)
		.then(res => {
			setToken(res.data.payload);
			errorSetter('');
			dispatch({type: LOGIN_SUCCESS});
		})
		.catch(err => {
			if (err.response.status === 401) {
				errorSetter('Invalid email/password pair');
			} else {
				errorSetter('An error occurred. Please try again.');
			}
			dispatch({ type: LOGIN_FAILURE, payload: err.message });
		});
};



export const register = (credentials, errorSetter, dispatch) => {

	dispatch({ type: REGISTER_START });
	axios.post(`${baseURL}/auth/register`, credentials)
		.then(res => {
			setToken(res.data.payload);
			errorSetter('');
			dispatch({type: REGISTER_SUCCESS});
		})
		.catch(err => {
			dispatch({ type: REGISTER_FAILURE, payload: err.message });
		});
};

