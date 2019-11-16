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
	EDIT_FAILURE
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

	// This method gets called at start-up.  To avoid a
	// pointless api call, do nothing if we're not logged in
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


export const addTopNine = (topNine, topNineState, dispatch) => {

	dispatch({ type: ADD_START });

	apiWithAuth().post(`${baseURL}/home/add-top-nine`)
		.then(res => {
			console.log(`axios POST /home/add-top-nine response:`);
			console.log(res);

			// the response is just a success message with the new id
			// we will update the top-nine list ourselves
			const newTopNineList =
				topNineState.topNineList.concat([{...topNine, id: res.data.id, user_id: topNineState.user_id}]);

			dispatch({type: ADD_SUCCESS, payload: newTopNineList});
		})
		.catch(err => {
			console.log(`axios POST /home/add-top-nine error:`);
			console.log(err);

			// if we have a 401 error, that means our token is expired or invalid
			if (err.message.includes('401')) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: ADD_FAILURE, payload: err.message });
			}
		});
};


export const updateTopNine = (id, topNine, topNineState, dispatch) => {

	dispatch({ type: EDIT_START });

	apiWithAuth().put(`${baseURL}/home/${id}/edit-top-nine`)
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

			dispatch({type: EDIT_SUCCESS, payload: newTopNineList});
		})
		.catch(err => {
			console.log(`axios POST /home/add-top-nine error:`);
			console.log(err);

			// if we have a 401 error, that means our token is expired or invalid
			if (err.message.includes('401')) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: EDIT_FAILURE, payload: err.message });
			}
		});
};


export const deleteTopNine = (id, topNineState, dispatch) => {

	dispatch({ type: DELETE_START });

	apiWithAuth().delete(`${baseURL}/home/${id}/delete-top-nine`)
		.then(res => {
			console.log(`axios DELETE /home/${id}/delete-top-nine response:`);
			console.log(res);

			// the response is just a success message; we need to adjust the state ourselves
			const newTopNineList = topNineState.topNineList.filter(item => item.id !== id);

			dispatch({type: DELETE_SUCCESS, payload: newTopNineList});
		})
		.catch(err => {
			console.log(`axios DELETE /home/${id}/delete-top-nine error:`);
			console.log(err);

			// if we have a 401 error, that means our token is expired or invalid
			if (err.message.includes('401')) {
				localStorage.removeItem('MTN-token');
				dispatch({ type: LOGOUT });
			} else {
				dispatch({ type: DELETE_FAILURE, payload: err.message });
			}
		});
};

