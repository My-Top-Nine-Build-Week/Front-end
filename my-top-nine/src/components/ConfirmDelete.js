import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { TopNineContext } from '../contexts/TopNineContext';
import { deleteTopNine } from '../utils/api';


const CDWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;

	h3 {
		font-size: 3rem;
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


const ConfirmDelete = (props) => {

	const { topNineState, dispatch } = useContext(TopNineContext);

	const id = Number.parseInt(props.match.params.id);
	const oldTopNine = topNineState.topNineList.find(item => item.id === id);

	// did we get a valid top-nine to edit?
	// if not, go back to top-nine-list immediately,
	// without executing any remaining code
	if (!oldTopNine) {
		return  (<Redirect to='/topnine' />);
	}


	const handleCancel = (e) => {
		e.preventDefault();
		// return to top-nine list without doing anything
		props.history.push('/topnine/');
	};


	const handleDelete = (e) => {
		e.preventDefault();
		// delete the item!
		deleteTopNine(id, topNineState, dispatch);
		// go back to top-nine list, no need to wait for outcome
		props.history.push('/topnine/');
	};


	return (
		<CDWrapper>
			<h3>Confirm Deletion:</h3>
				<div className='top-nine-item'>
					<p>{oldTopNine.title}</p>
					<p>Description: {oldTopNine.description}</p>
					<img src={oldTopNine.image_url} alt={oldTopNine.title} />
					<div className='button-bar'>
						<button onClick={handleCancel}>Cancel</button>
						<button onClick={handleDelete}>Delete</button>
					</div>
				</div>
		</CDWrapper>
	);
};


export default ConfirmDelete;
