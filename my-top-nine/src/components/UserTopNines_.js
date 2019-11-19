import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { TopNineContext } from '../contexts/TopNineContext';
import { getUserTopNines } from '../utils/api';


const UTNWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;

	h3 {
		font-size: 2.6rem;
		margin: 20px;
	}

	p {
		font-size: 1.8rem;
	}

	.top-nine-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 300px;
		border: 2px solid gray;
		border-radius: 20px;
		padding: 10px;
		margin: 20px;

		p {
			font-size: 1.6rem;
			margin: 5px;
		}

		img {
			margin-top: 10px;
			height: 50px;
			width: auto;
			font-size: 1.4rem;
			font-style: italic;
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


const UserTopNines = (props) => {

	const { topNineState, dispatch } = useContext(TopNineContext);

	// the user's top-nine list will be stored in local state
	const [userTopNine, setUserTopNine] = useState([]);

	// get user id from the url path
	const id = Number.parseInt(props.match.params.id);
	const user = topNineState.userList.find(user => user.id === id);

	const user_id = user ? user.id : -1;

	// get top nine list for a specific user
	useEffect(() => {
		getUserTopNines(user_id, setUserTopNine, dispatch);
	}, [user_id, setUserTopNine, dispatch]);


	// did we get a valid top-nine to edit?
	// if not, go back to top-nine-list
	if (!user) {
		return  (<Redirect to='/users' />);
	}


	const handleAdd = (e, item) => {
		console.log('in handleAdd function');
		// TODO: add code to add a different user's top-nine item to ours
	};


	return (
		<UTNWrapper>
			<h3>Top Nine List for {user.name}</h3>

			{(userTopNine.length === 0) && <p>The top-nine list for {user.name} is empty!</p> }

			{userTopNine.map(item => {
				return (
					<div className='top-nine-item' key={item.id} >
						<p>{item.title}</p>
						<p>Description: {item.description}</p>
						<img src={item.image_url} alt={item.title} />
						<div className='button-bar'>
							<button onClick={e => handleAdd(e, item)}>Add to My Top Nines</button>
						</div>
					</div>
				);
			})}
		</UTNWrapper>
	);
};


export default UserTopNines;
