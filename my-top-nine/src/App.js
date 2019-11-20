import React, { useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";

import { topNineReducer, initialState } from "./reducers/topNineReducer";
import { TopNineContext } from "./contexts/TopNineContext";
import { getTopNine } from "./utils/api";

import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

// Components with an underscore at the end are 'placeholder's --
// they are functional but may be replaced with fancier versions
import Login from "./components/Login_";
import Register from "./components/Register_";
import Welcome from "./components/Welcome_";
import TopNineList from "./components/TopNineList";
import EditTopNine from "./components/EditTopNine_";
import AddTopNine from "./components/AddTopNine_";
import ConfirmDelete from "./components/ConfirmDelete_";
import UserList from "./components/UserList_";
import UserTopNines from "./components/UserTopNines_";

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
    background-color: #ff4040;

    h3 {
      font-size: 3rem;
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
`;

const App = () => {
  const [topNineState, dispatch] = useReducer(topNineReducer, initialState);

  const loggedIn = localStorage.getItem("MTN-token");

  // get user info and list of top-nines
  // if we're not logged in, this will not do anything
  useEffect(() => {
    getTopNine(dispatch);
  }, [dispatch, loggedIn]);

  return (
    <TopNineContext.Provider value={{ topNineState, dispatch }}>
      <AppWrapper>
        <div className='nav'>
          <img src={require("./images/tn.png")} alt='Logo' />
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
};

export default withRouter(App);
