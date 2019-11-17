import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { TopNineContext } from '../contexts/TopNineContext';

import { addTopNine } from '../utils/api';


const ATNWrapper = styled.div`
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


const AddTopNine = (props) => {

	// dispatcher for addTopNine function
	const { topNineState, dispatch } = useContext(TopNineContext);

	const [error, setError] = useState();

	const [data, setData] = useState({
		title: '',
		description: '',
		image_url: ''
	});

	const [adding, setAdding] = useState(true);


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
			addTopNine(data, setAdding, topNineState, dispatch);
		}
	};


	// if we successfully added the item, go to top-nine-list
	if (!adding) {
		return  (<Redirect to='/topnine' />);
	}

	return (
		<ATNWrapper>
			<h3>Add a New Top-Nine Item</h3>

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

				<button type='submit'>Add</button>
			</form>
		</ATNWrapper>
	);

};

export default AddTopNine;
