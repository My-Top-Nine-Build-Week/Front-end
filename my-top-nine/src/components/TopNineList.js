import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "reactstrap";

import { TopNineContext } from "../contexts/TopNineContext";

import TopNineModal from "./TopNineModal";
import TopNineForm from "./TopNineForm";

const TNLWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 30px auto;
  width: 50%;

  h3 {
    font-size: 1rem;
    text-align: center;
  }

  img {
    border-radius: 50%;
    width: 100%;
    height: 150px;
  }

  div.form-btn {
	width: 25%;
	height 290px;
	
	button#btn-color {
		width: 100%;
		height: 100%;
		background: white;
		border: white;

		i {
			font-size: 160px;
			color: lightgrey;
		}
	}
}
`;

const TNLItem = styled.div`
  width: 25%;

  div {
    width: 100%;
  }
`;

const TopNineList = () => {
  const { topNineState, dispatch } = useContext(TopNineContext);

  const topNineData = topNineState.topNineList;
  console.log(topNineState.TopNineList);

  // const newItem = item => {
  //   const addItem = setTopNineData([...topNineData, item]);
  // };
  // if (topNineData.length === 0) {
  //   return <Redirect to='/addtopnine' />;
  // }
  return (
    <TNLWrapper>
      {topNineData.map(data => (
        <TopNineDisplay key={data.user_id} data={data} />    
      ))}
      <TopNineForm />
    </TNLWrapper>
  );
};

function TopNineDisplay({ data, props }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { title, image_url, user_id, description, id } = data;

  return (
    <TNLItem>
      <div>
        <h3>{title}</h3>
        {/* <img src={image_url} alt={description} /> */}
        <TopNineModal
          title={title}
          description={description}
          image_url={image_url}
          id={id}
        />
      </div>
    </TNLItem>
  );
}

export default TopNineList;
