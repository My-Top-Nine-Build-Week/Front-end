import React, { useReducer } from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

import { topNineReducer, getInitialState } from './reducers/topNineReducer';
import { TopNineContext } from './contexts/TopNineContext';

import TopNineList from './components/TopNineList';
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

	const [topNineState, dispatch] = useReducer(topNineReducer, getInitialState());

	const loggedIn = topNineState.loggedIn;

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

				<ProtectedRoute path='/topnine' component={TopNineList} />
				<Route path='/register' component={Register} />
				<ProtectedRoute path='/logout' component={Logout} />
				<Route path='/login' component={Login} />
			</AppWrapper>
		</TopNineContext.Provider>
	);
};


export default withRouter(App);
