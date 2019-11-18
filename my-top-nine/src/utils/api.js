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
	ADD_START,
	ADD_SUCCESS,
	ADD_FAILURE,
	DELETE_START,
	DELETE_SUCCESS,
	DELETE_FAILURE,
	EDIT_START,
	EDIT_SUCCESS,
	EDIT_FAILURE,
	GET_USERS_START,
	GET_USERS_SUCCESS,
	GET_USERS_FAILURE
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



export const login = (credentials, dispatch, setMessage) => {

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
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			let message = apiMessage;
			if (status === 401) {
				message = 'Invalid email/password pair';
			}
			setMessage(message);

			dispatch({ type: LOGIN_FAILURE, payload: apiMessage });
		});
};



export const register = (credentials, dispatch, setMessage) => {

	dispatch({ type: REGISTER_START });

	axios.post(`${baseURL}/auth/register`, credentials)
		.then(res => {
			console.log('axios POST /auth/register response:');
			console.log(res);

			setMessage('Success!...please wait while we log you in');
			dispatch({type: REGISTER_SUCCESS});

			// automatically log the user in
			login(credentials, dispatch, setMessage);
		})
		.catch(err => {
			console.log('axios POST /auth/register error:');
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			let message = apiMessage;
			if (status === 500) {
				message = 'That email is already in use, please use another';
			}
			setMessage(message);

			dispatch({ type: REGISTER_FAILURE, payload: apiMessage });
		});
};


export const getTopNine = (dispatch) => {

	// This method gets called at start-up.  To avoid a
	// pointless api call, do nothing if we're not logged in
	if (!localStorage.getItem('MTN-token')) return;

	dispatch({ type: LOAD_START });

	apiWithAuth().get('/home')
		.then(res => {
			console.log('axios GET /home response:');
			console.log(res);

			dispatch({type: LOAD_SUCCESS, payload: res.data});
		})
		.catch(err => {
			console.log('axios GET /home error:');
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			// if we have a 401 error, that means our token is expired or invalid
			if (status === 401) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: LOAD_FAILURE, payload: apiMessage });
			}
		});
};


export const addTopNine = (topNine, topNineState, dispatch, setMessage) => {

	dispatch({ type: ADD_START });

	apiWithAuth().post('/home/add-top-nine', topNine)
		.then(res => {
			console.log(`axios POST /home/add-top-nine response:`);
			console.log(res);

			// let the caller know we succeeded
			setMessage('Success');

			// the response is just a success message with the new id - we need to update the top-nine list
			const newTopNineList =
				topNineState.topNineList.concat([{...topNine, id: res.data.id, user_id: topNineState.user_id}]);
			dispatch({type: ADD_SUCCESS, payload: newTopNineList});
		})
		.catch(err => {
			console.log(`axios POST /home/add-top-nine error:`);
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			// if we have a 401 error, that means our token is expired or invalid
			if (status === 401) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				setMessage(apiMessage);
				dispatch({ type: ADD_FAILURE, payload: apiMessage });
			}
		});
};


export const editTopNine = (id, topNine, topNineState, dispatch, setMessage) => {

	dispatch({ type: EDIT_START });

	apiWithAuth().put(`/home/${id}/edit-top-nine`, topNine)
		.then(res => {
			console.log(`axios PUT /home/${id}/edit-top-nine response:`);
			console.log(res);

			// the response is just a success message with the id
			// we will update the top-nine list ourselves
			const updatedTopNine = {...topNine, id: id, user_id: topNineState.user_id};
			const updatedIndex = topNineState.topNineList.findIndex(item => item.id === id);
			const frontTopNineList = topNineState.topNineList.slice(0, updatedIndex);
			const backTopNineList = topNineState.topNineList.slice(updatedIndex + 1);
			const newTopNineList = frontTopNineList.concat([updatedTopNine]).concat(backTopNineList);

			setMessage('Success');
			dispatch({type: EDIT_SUCCESS, payload: newTopNineList});
		})
		.catch(err => {
			console.log(`axios PUT /home/${id}/edit-top-nine error:`);
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			// if we have a 401 error, that means our token is expired or invalid
			if (status === 401) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				setMessage(apiMessage);
				dispatch({ type: EDIT_FAILURE, payload: apiMessage });
			}
		});
};


export const deleteTopNine = (id, topNineState, dispatch) => {

	dispatch({ type: DELETE_START });

	apiWithAuth().delete(`/home/${id}/delete-top-nine`)
		.then(res => {
			console.log(`axios DELETE /home/${id}/delete-top-nine response:`);
			console.log(res);

			// the response is just a success message; we need to adjust the state ourselves
			const newTopNineList = topNineState.topNineList.filter(item => item.id !== id);

			dispatch({type: DELETE_SUCCESS, payload: newTopNineList});
		})
		.catch(err => {
			console.log(`axios DELETE /home/${id}/delete-top-nine error:`);
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			// if we have a 401 error, that means our token is expired or invalid
			if (status === 401) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: DELETE_FAILURE, payload: apiMessage });
			}
		});
};


export const getUsers = (dispatch) => {

	dispatch({ type: GET_USERS_START });

	apiWithAuth().get('/users')
		.then(res => {
			console.log('axios GET /users response:');
			console.log(res);

			dispatch({type: GET_USERS_SUCCESS, payload: res.data});
		})
		.catch(err => {
			console.log('axios GET /users error:');
			console.log(err.response);

			const status = err.response.status;
			const statusText = err.response.statusText;
			const apiMessage = status.toString() + ': ' + statusText;

			// if we have a 401 error, that means our token is expired or invalid
			if (status === 401) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: GET_USERS_FAILURE, payload: apiMessage });
			}
		});
};


export const getUserTopNines = (user_id, setter, dispatch) => {

	// a different user's top-nine list will be stored in
	// local state, so dispatch is only used in an error condition

	// if we have an invalid user_id, just return an empty array
	if (user_id < 0) {
		setter([]);
		return;
	}

	apiWithAuth().get(`/users/${user_id}/top-nine`)
		.then(res => {
			console.log(`axios GET /users/${user_id}/top-nine response:`);
			console.log(res);

			setter(res.data);
		})
		.catch(err => {
			console.log(`axios GET /users/${user_id}/top-nine error:`);
			console.log(err.response);

			const status = err.response.status;

			// if we have a 401 error, that means our token is expired or invalid
			if (status === 401) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			}
		});
};

