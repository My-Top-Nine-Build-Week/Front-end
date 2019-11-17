import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...rest}) => {

	return (
		<Route {...rest} render={(renderProps) => {
			if (localStorage.getItem('MTN-token')) {
				return <Component {...renderProps} />
			} else {
				return <Redirect to='/login' />
			}
		}} />
	);
};


export default ProtectedRoute;
