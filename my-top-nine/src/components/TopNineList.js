import React, { useContext } from 'react';
import styled from 'styled-components';

import { TopNineContext } from '../contexts/TopNineContext';


const TNLWrapper = styled.div`
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
	}


`;


const TopNineList = () => {

	const { topNineState } = useContext(TopNineContext);

	console.log('in TopNineList');
	console.log(topNineState);

	return (
		<TNLWrapper>
			<h3>Your Top Nine items:</h3>
			{topNineState.topNineList.map(item => {
				return (
					<div className='top-nine-item' key={item.id} >
						<p>{item.title}</p>
						<p>Description: {item.description}</p>
						<img src={item.image_url} alt={item.title} />
					</div>
				);
			})}
		</TNLWrapper>
	);
};


export default TopNineList;
