import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styled from "styled-components";

const ModalImageWrapper = styled.div`
  width: 100%;

  img {
    border-radius: 50%;
    width: 100%;
    height: 400px;
  }
`;

const ModalTextWrapper = styled.div`
  text-align: center;
  font-size: 2rem;
`;

const TopNineModal = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className='photo'>
      <Button color='light' onClick={toggle}>
        <img src={props.image_url} alt={props.description} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <ModalTextWrapper>
            <h2>{props.title}</h2>
          </ModalTextWrapper>
          <ModalImageWrapper>
            <img src={props.image_url} alt={props.description} />
          </ModalImageWrapper>
        </ModalHeader>
        <ModalTextWrapper>
          <ModalBody>{props.description}</ModalBody>
        </ModalTextWrapper>
      </Modal>
    </div>
  );
};
export default TopNineModal;

// {props.image_url == "https" ? (
//   <img
//     src={
//       (props.image_url =
//         "https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg")
//     }
//     alt={props.description}
//   />
// ) : (
//   <img src={props.image_url} alt={props.description} />
// )}
