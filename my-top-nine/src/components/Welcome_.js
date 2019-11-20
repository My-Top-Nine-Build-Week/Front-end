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
    font-size: 3rem;
    font-family: sans-serif;
  }

  .tn-display {
    height: 100vh;
    width: 100%;
    text-align: center;
    font-family: "zilap_monogramaregular";
  }

  .tn-display ul li {
    vertical-align: middle;
    font-size: 80px;
    letter-spacing: 10px;
    transition: all ease-in 0.3s;
    animation: percipitate 6s;
    margin: 30px 0px;
  }

  .tn-display ul li:first-child {
    animation-delay: 0s;
  }

  .tn-display ul li:nth-child(2) {
    animation-delay: 0s;
  }

  .tn-display ul li:nth-child(3) {
    animation-delay: 0s;
  }

  .tn-display ul li:nth-child(4) {
    animation-delay: 0s;
  }

  .tn-display ul li:nth-child(5) {
    animation-delay: 0s;
  }

  .tn-display ul li:nth-child(6) {
    animation-delay: 0s;
  }

  @keyframes percipitate {
    0% {
      transform: rotate(-90deg) translateX(200px);
      opacity: 0;
      filter: blur(20px);
    }
    100% {
      transform: rotate(0deg) translateY(0px);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;

const Welcome = () => {
  return (
    <WelcomeWrapper>
      {/* <img src={require("../images/bg.png")} alt='background image' /> */}
      <div>
        <div class='tn-display'>
          <ul>
            <li className='one'>T</li>
            <li className='two'>O</li>
            <li className='three'>P</li>
            <li className='four'>NINE</li>
            <li className='five'>
              <h1>Where you can pick and share your favorite things</h1>
            </li>
          </ul>
        </div>
      </div>
    </WelcomeWrapper>
  );
};

export default Welcome;
