import React from 'react';
import styled from 'styled-components';


const WelcomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-top: 50px;

	h1 {
		font-size: 4rem;
	}	
`;


const Welcome = () => {

	return (
		<WelcomeWrapper>
			<h1>Keep track of your favorite things!</h1>
		</WelcomeWrapper>
	);
};


export default Welcome;
