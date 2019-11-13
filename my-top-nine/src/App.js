import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';


const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;
	width: 100%;

	h1 {
		font-size: 4rem;
	}	
`;


const App = () => {


	return (
		<AppWrapper>
			<h1>My Top Nine</h1>
		</AppWrapper>
	);
};


export default withRouter(App);
