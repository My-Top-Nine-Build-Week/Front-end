import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { TopNineContext } from "../contexts/TopNineContext";
import { getUserTopNines } from "../utils/api";

import TopNineModal from "./TopNineModal";

// const UTNWrapper = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   align-items: center;
//   margin: 30px auto;
//   width: 50%;

//   h3 {
//     font-size: 1rem;
//     text-align: center;
//   }

//   div {
//     flex-flow: row wrap;
//     align-items: center;
//     margin: 30px auto;
//     width: 50%;

//     p {
//       font-size: 1.8rem;
//     }

//     .top-nine-item {
//       width: 25%;

//       div {
//         width: 100%;
//       }
//     }

//     p {
//       font-size: 1.6rem;
//       margin: 5px;
//     }

//     img {
//       border-radius: 50%;
//       width: 100%;
//       height: 150px;
//     }

//     .button-bar {
//       display: flex;
//       flex-direction: row;
//       justify-content: space-around;
//       width: 100%;
//       margin-top: 10px;
//     }
//   }
// `;

const UTNWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  h2 {
    font-size: 2.5rem;
  }
`;

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

const UserTopNines = props => {
  const { topNineState, dispatch } = useContext(TopNineContext);

  // the user's top-nine list will be stored in local state
  const [userTopNine, setUserTopNine] = useState([]);

  // get user id from the url path
  const id = Number.parseInt(props.match.params.id);
  const user = topNineState.userList.find(user => user.id === id);

  const user_id = user ? user.id : -1;

  // get top nine list for a specific user
  useEffect(() => {
    getUserTopNines(user_id, setUserTopNine, dispatch);
  }, [user_id, setUserTopNine, dispatch]);

  // did we get a valid top-nine to edit?
  // if not, go back to top-nine-list
  if (!user) {
    return <Redirect to='/users' />;
  }

  const handleAdd = (e, item) => {
    console.log("in handleAdd function");
    // TODO: add code to add a different user's top-nine item to ours
  };

  if (userTopNine.image_url === "") {
    return (
      <UTNWrapper>
        <h2>Top Nine List for {user.name}</h2>
        <TNLWrapper>
          {userTopNine.map(data => (
            <TopNineDisplay
              key={data.user_id}
              data={data}
              image_url={
                (data.image_url =
                  "https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg")
              }
            />
          ))}
        </TNLWrapper>
      </UTNWrapper>
    );
  }
  return (
    <UTNWrapper>
      <h2>Top Nine List for {user.name}</h2>
      <TNLWrapper>
        {userTopNine.map(data => (
          <TopNineDisplay key={data.user_id} data={data} />
        ))}
      </TNLWrapper>
    </UTNWrapper>
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

export default UserTopNines;

// <UTNWrapper>
//       <div>
//         <h3>Top Nine List for {user.name}</h3>

//         {userTopNine.length === 0 && (
//           <p>The top-nine list for {user.name} is empty!</p>
//         )}

//         {userTopNine.map(item => {
//           return (
//             <div className='top-nine-item' key={item.id}>
//               <TopNineModal
//                 title={item.title}
//                 description={item.description}
//                 image_url={item.image_url}
//               />
//               {/* <p>{item.title}</p>
//               <p>Description: {item.description}</p>
//               <img src={item.image_url} alt={item.title} /> */}
//               <div className='button-bar'>
//                 <button onClick={e => handleAdd(e, item)}>
//                   Add to My Top Nines
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </UTNWrapper>
