import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";

import { TopNineContext } from "../contexts/TopNineContext";
import { getUsers } from "../utils/api";

const ULWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  h3 {
    font-size: 3rem;
  }

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    border: 2px solid gray;
    border-radius: 20px;
    padding: 10px;
    margin: 20px;
    height: 200px;
    justify-content: space-around;

    p {
      font-size: 1.6rem;
      margin: 5px;
    }

    .button-bar {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      margin-top: 10px;
    }
  }
`;

const UserList = props => {
  const { topNineState, dispatch } = useContext(TopNineContext);

  // get list of users
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleShowTopNine = (e, id) => {
    props.history.push(`/usertopnine/${id}`);
  };

  return (
    <ULWrapper>
      <h3>User List:</h3>
      {topNineState.userList.map(user => {
        return (
          <div className='user' key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <div className='button-bar'>
              <Button
                color='primary'
                onClick={e => handleShowTopNine(e, user.id)}
              >
                Show Top Nine
              </Button>
              {/* <button onClick={e => handleShowTopNine(e, user.id)}>
                Show Top Nine
              </button> */}
            </div>
          </div>
        );
      })}
    </ULWrapper>
  );
};

export default UserList;
