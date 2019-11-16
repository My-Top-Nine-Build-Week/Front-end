import axios from 'axios';

import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGOUT,
	LOAD_START,
	LOAD_SUCCESS,
	LOAD_FAILURE,
	/*
	ADD_START,
	ADD_SUCCESS,
	ADD_FAILURE,
	DELETE_START,
	DELETE_SUCCESS,
	DELETE_FAILURE,
	EDIT_START,
	EDIT_SUCCESS,
	EDIT_FAILURE,
	*/
} from '../reducers/topNineReducer';


export const baseURL = 'https://salty-stream-78442.herokuapp.com';


export const apiWithAuth = () => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('MTN-token')
		}
	});
};



export const login = (credentials, dispatch) => {
	// note: errorSetter sets local state in the login form
	// dispatch updates the global state

	console.log('inside login');
	console.log(credentials);

	dispatch({ type: LOGIN_START });

	axios.post(`${baseURL}/auth/login`, credentials)
		.then(res => {
			console.log('axios POST /auth/login response:');
			console.log(res);

			localStorage.setItem('MTN-token', res.data.token);
			dispatch({type: LOGIN_SUCCESS});
		})
		.catch(err => {
			console.log('axios POST /auth/login error:');
			console.log(err);

			let message = err.message;
			if (message.includes('401')) {
				message = 'Invalid email/password pair';
			}

			dispatch({ type: LOGIN_FAILURE, payload: message });
		});
};



export const register = (credentials, registerSetter, dispatch) => {

	dispatch({ type: REGISTER_START });

	axios.post(`${baseURL}/auth/register`, credentials)
		.then(res => {
			console.log('axios POST /auth/register response:');
			console.log(res);

			registerSetter(false);
			dispatch({type: REGISTER_SUCCESS});
		})
		.catch(err => {
			console.log('axios POST /auth/register error:');
			console.log(err);

			dispatch({ type: REGISTER_FAILURE, payload: err.message });
		});
};


export const getTopNine = (dispatch) => {

	// if we're not logged in, do nothing
	if (!localStorage.getItem('MTN-token')) return;

	dispatch({ type: LOAD_START });

	apiWithAuth().get(`${baseURL}/home`)
		.then(res => {
			console.log('axios GET /home response:');
			console.log(res);

			dispatch({type: LOAD_SUCCESS, payload: res.data});
		})
		.catch(err => {
			console.log('axios GET /home error:');
			console.log(err);

			// if we have a 401 error, that means our token is expired or invalid
			if (err.message.includes('401')) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: LOAD_FAILURE, payload: err.message });
			}
		});
};

