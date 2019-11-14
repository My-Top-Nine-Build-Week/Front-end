import React, { useContext } from 'react';
import styled from 'styled-components';

import { TopNineContext } from '../contexts/TopNineContext';


const TNLWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;
	width: 100%;

	h3 {
		font-size: 3rem;
	}	
`;


const TopNineList = () => {

	const { topNineState, dispatch } = useContext(TopNineContext);


	return (
		<TNLWrapper>
			<h3>A list of your Top Nine items will go here!</h3>
		</TNLWrapper>
	);
};


export default TopNineList;
