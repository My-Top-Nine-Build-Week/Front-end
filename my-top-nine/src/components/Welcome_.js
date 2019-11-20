import React from "react";
import styled from "styled-components";
import bg from "../images/bg-tn.svg";

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  h1 {
    font-size: 4rem;
  }
`;

const Welcome = () => {
  return (
    <WelcomeWrapper>
      {/* <img src={require("../images/bg.png")} alt='background image' /> */}
      <div>
        <h1>My Top Nine</h1>
      </div>
    </WelcomeWrapper>
  );
};

export default Welcome;
