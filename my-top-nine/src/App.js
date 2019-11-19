<<<<<<< HEAD
import React, { useReducer } from "react";
import { withRouter } from "react-router";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";

import { topNineReducer, getInitialState } from "./reducers/topNineReducer";
import { TopNineContext } from "./contexts/TopNineContext";

import TopNineList from "./components/TopNineList";
import TopNineForm from "./components/TopNineForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

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
    background-color: #ff3e45;

    h3 {
      font-size: 3.4rem;
      font-weight: bold;
      margin: 10px;
    }

    a {
      font-size: 1.8rem;
      text-decoration: none;
      color: #fff;

      &:hover {
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
=======
import React, { useReducer, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

import { topNineReducer, initialState } from './reducers/topNineReducer';
import { TopNineContext } from './contexts/TopNineContext';
import { getTopNine } from './utils/api';

import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';

// Components with an underscore at the end are 'placeholder's --
// they are functional but may be replaced with fancier versions
import Login from './components/Login_';
import Register from './components/Register_';
import Welcome from './components/Welcome_';
import TopNineList from './components/TopNineList_';
import EditTopNine from './components/EditTopNine_';
import AddTopNine from './components/AddTopNine_';
import ConfirmDelete from './components/ConfirmDelete_';
import UserList from './components/UserList_';
import UserTopNines from './components/UserTopNines_';


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
			font-size: 3rem;
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
>>>>>>> 551614fe0811cef4e35ad4bb6d5666c758180515
`;

const App = () => {
<<<<<<< HEAD
  const [topNineState, dispatch] = useReducer(
    topNineReducer,
    getInitialState()
  );

  const loggedIn = topNineState.loggedIn;

  return (
    <TopNineContext.Provider value={{ topNineState, dispatch }}>
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
      <TopNineList />
      {/* <TopNineForm /> */}
    </TopNineContext.Provider>
  );
=======

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
					{loggedIn && <Link to='/addtopnine'>Add New</Link>}
					{loggedIn && <Link to='/topnine'>Top Nine</Link>}
					{loggedIn && <Link to='/users'>Show Users</Link>}
					{!loggedIn && <Link to='/login'>Login</Link>}
					{!loggedIn && <Link to='/register'>Register</Link>}
					{loggedIn && <Link to='/logout'>Logout</Link>}
				</div>

				<Route exact path='/' component={Welcome} />
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<ProtectedRoute path='/logout' component={Logout} />

				<ProtectedRoute path='/topnine' component={TopNineList} />
				<ProtectedRoute path='/addtopnine' component={AddTopNine} />
				<ProtectedRoute path='/edittopnine/:id' component={EditTopNine} />
				<ProtectedRoute path='/confirmdelete/:id' component={ConfirmDelete} />

				<ProtectedRoute path='/users' component={UserList} />
				<ProtectedRoute path='/usertopnine/:id' component={UserTopNines} />
			</AppWrapper>
		</TopNineContext.Provider>
	);
>>>>>>> 551614fe0811cef4e35ad4bb6d5666c758180515
};

export default withRouter(App);
