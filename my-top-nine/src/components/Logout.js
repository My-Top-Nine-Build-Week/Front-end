import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { LOGOUT } from '../reducers/topNineReducer';
import { TopNineContext } from '../contexts/TopNineContext';


const Logout = () => {

	const { dispatch } = useContext(TopNineContext);

	// remove the token and call dispatch to reset all global state
	localStorage.removeItem('MTN-token');
	dispatch(LOGOUT);
	
	return <Redirect to='/' />
};


export default Logout;
