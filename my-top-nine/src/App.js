import React, { useReducer, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

import { topNineReducer, initialState } from './reducers/topNineReducer';
import { TopNineContext } from './contexts/TopNineContext';
import { getTopNine } from './utils/api';

import Welcome from './components/Welcome';
import TopNineList from './components/TopNineList';
import AddTopNine from './components/AddTopNine';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';


const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 80px;
		background-color: lightgrey;

		h3 {
			font-size: 3.4rem;
			font-weight: bold;
			margin: 10px;
		}

		a {
			font-size: 1.8rem;
			text-decoration: none;
			color: #333;

			&:hover {
				font-weight: bold;
				cursor: pointer;
			}
		}
	}
`;


const App = () => {

	const [topNineState, dispatch] = useReducer(topNineReducer, initialState);

	const loggedIn = localStorage.getItem('MTN-token');

	// get user info and list of top-nines
	// if we're not logged in, this will not do anything
	useEffect(() => {
		getTopNine(dispatch);
	}, [dispatch, loggedIn]);


	return (
		<TopNineContext.Provider value={ {topNineState, dispatch} }>
			<AppWrapper>
				<div className='nav'>
					<h3>My Top Nine!</h3>
					<Link to='/'>Home</Link>
					{loggedIn && <Link to='/topnine'>Top Nine</Link>}
					{!loggedIn && <Link to='/login'>Login</Link>}
					{!loggedIn && <Link to='/register'>Register</Link>}
					{loggedIn && <Link to='/logout'>Logout</Link>}
				</div>

				<Route exact path='/' component={Welcome} />
				<ProtectedRoute path='/addtopnine' component={AddTopNine} />
				<ProtectedRoute path='/topnine' component={TopNineList} />
				<Route path='/register' component={Register} />
				<ProtectedRoute path='/logout' component={Logout} />
				<Route path='/login' component={Login} />
			</AppWrapper>
		</TopNineContext.Provider>
	);
};


export default withRouter(App);
