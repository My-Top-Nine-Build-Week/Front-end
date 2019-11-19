import React, { useContext, useState } from "react";
import styled from "styled-components";

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

const seedData = [
  {
    title: "Flock Of Birds",
    description: "A beautiful flock of birds",
    user_id: 1,
    image_url:
      "https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  },
  {
    title: "Green Field and Flowing River",
    description: "A beautiful green field",
    user_id: 2,
    image_url:
      "https://images.pexels.com/photos/1537136/pexels-photo-1537136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "A beautiful Sunset",
    description: "Sunset over the ocean",
    user_id: 3,
    image_url:
      "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Birds and the Moon",
    description:
      "Birds flying in the sunset sky as the moon is slightly seen in the distance",
    user_id: 4,
    image_url:
      "https://images.pexels.com/photos/1921336/pexels-photo-1921336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Beautiful Mountain Top",
    description: "White and Black Mountain Wallpaper",
    user_id: 5,
    image_url:
      "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Meditation",
    description: "Person on a Bridge Near a Lake",
    user_id: 6,
    image_url:
      "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Orange Jellyfish",
    description: "Four Orange Jellyfish Wallpaper",
    user_id: 7,
    image_url:
      "https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Beautiful Orange Sunset",
    description: "Sunset over Snow Covered Mountains",
    user_id: 8,
    image_url:
      "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Walt Disney Castle",
    description: "Walt Disney Castle",
    user_id: 9,
    image_url:
      "https://images.pexels.com/photos/2362002/pexels-photo-2362002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  }
];
const TopNineList = () => {
  const { topNineState, dispatch } = useContext(TopNineContext);

  const [topNineData, setTopNineData] = useState(seedData);

  const newItem = item => {
    const addItem = setTopNineData([...topNineData, item]);
  };

  return (
    <TNLWrapper>
      {topNineData.map(data => (
        <TopNineDisplay key={data.user_id} data={data} />
      ))}
      <TopNineForm newItem={newItem} />
    </TNLWrapper>
  );
};

function TopNineDisplay({ data, props }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { title, image_url, user_id, description } = data;

  return (
    <TNLItem>
      <div>
        <h3>{title}</h3>
        {/* <img src={image_url} alt={description} /> */}
        <TopNineModal
          title={title}
          description={description}
          image_url={image_url}
        />
      </div>
    </TNLItem>
  );
}

export default TopNineList;
