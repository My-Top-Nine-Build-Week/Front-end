import React from 'react';
import { Redirect } from 'react-router-dom';
import { clearToken } from '../utils/api';


const Logout = (props) => {
	clearToken();
	return <Redirect to='/' />
};


export default Logout;
