import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { TopNineContext } from '../contexts/TopNineContext';

import { editTopNine } from '../utils/api';


const ETNWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	text-align: center;

	h3 {
		font-size: 2.6rem;
		margin: 20px;
	}

	.error {
		font-size: 2rem;
		color: red;
	}

	.info {
		font-size: 2rem;
		color: red;
	}


	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 380px;
		margin-top: 10px;
		padding: 10px;
		border: 2px solid grey;
		border-radius: 10px;
	}

	label {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 1.4rem;
		font-style: italic;
	}

	span {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		width: 80px;
		margin-right: 5px;
	}

	input {
		font-size: 1.4rem;
		width: 260px;
		margin: 5px;
		padding: 5px;
	}

	textarea {
		font-size: 1.4rem;
		margin: 5px;
		padding: 5px;
		width: 260px;
		height: 80px;
		font-family: sans-serif;
	}

	button {
		height: 28px;
		background-color: #AAA;
		color: black;
		border: none;
		border-radius: 5px;
		width: 80px;
		font-size: 1.4rem;
		margin-top: 10px;

		&:hover {
			cursor: pointer;
			background-color: grey;
			color: white;
		}
	}
`;


const EditTopNine = (props) => {

	// dispatcher for editTopNine function
	const { topNineState, dispatch } = useContext(TopNineContext);

	const [error, setError] = useState();

	const [data, setData] = useState({
		title: '',
		description: '',
		image_url: ''		
	});

	const [editing, setEditing] = useState(true);


	console.log('in EditTopNine');
	console.log(props);

	const id = Number.parseInt(props.match.params.id);

	console.log(id);
	console.log(topNineState.topNineList);


	const oldTopNine = topNineState.topNineList.find(item => item.id === id);

	/*
	if (oldTopNine) {
		setData({
			title: oldTopNine.title,
			description: oldTopNine.description,
			image_url: oldTopNine.image_url		
		});
	}

	console.log(data);

	// did we get a valid top nine to edit?
	// if not, go back to top-nine-list
	if (oldTopNine === undefined) {
		return  (<Redirect to='/topnine' />);
	}
	*/


	const handleChange = (e) => {
		setData({
			...data, [e.target.name]: e.target.value
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		if (!(data.title && data.description)) {
			setError('You must supply a title and description');
		} else {
			editTopNine(data, setEditing, topNineState, dispatch);
		}
	};


	// if we successfully edited the item, go back to top-nine-list
	if (!editing) {
		return  (<Redirect to='/topnine' />);
	}

	return (
		<ETNWrapper>
			<h3>Edit Top-Nine Item</h3>

			{error && <div className='error'>{error}</div>}
			{topNineState.apiMessage && <div className='info'>{topNineState.apiMessage}</div>}

			<form onSubmit={handleSubmit}>

				<label name='title'><span>Title:</span>
					<input type='text' name='title' placeholder='Title'
						value={data.title} onChange={handleChange} />
				</label>
				<label className='desc' name='description'><span className='desc'>Description:</span>
					<textarea name='description' placeholder='Description'
						value={data.description} onChange={handleChange} />
				</label>
				<label name='image_url'><span>Image link:</span>
					<input type='url' name='image_url' placeholder='Link'
						value={data.image_url} onChange={handleChange} />
				</label>

				<button type='submit'>Submit</button>
			</form>
		</ETNWrapper>
	);

};

export default EditTopNine;
