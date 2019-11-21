import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { TopNineContext } from "../contexts/TopNineContext";
import { addTopNine } from "../utils/api";

import { Button, Modal, ModalBody } from "reactstrap";

import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin: auto 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0;
  }
`;

const TopNineForm = props => {
  const { topNineState, dispatch } = useContext(TopNineContext);

  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    title: "",
    description: "",
    image_url: ""
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage("");

    if (!(data.title && data.description)) {
      setMessage("You must supply a title and description");
    } else {
      addTopNine(data, topNineState, dispatch, setMessage);
    }
  };

  // if we successfully added the item, go to top-nine-list
  if (message.substring(0, 7) === "Success") {
    return <Redirect to='/topnine' />;
  }

  return (
    <div className='form-btn'>
      {" "}
      <Button color='light' onClick={toggle} id='btn-color'>
        <i className='fas fa-plus-circle'></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <div className='message'>{message}</div>
          <FormWrapper>
            <h3>Add a New Top-Nine Item</h3>

            <div className='message'>{message}</div>

            <form onSubmit={handleSubmit}>
              <label name='title'>
                <span>Title:</span>
                <br />
                <input
                  type='text'
                  name='title'
                  placeholder='Title'
                  value={data.title}
                  onChange={handleChange}
                />
              </label>
              <label className='desc' name='description'>
                <span className='desc'>Description:</span>
                <br />
                <textarea
                  name='description'
                  placeholder='Description'
                  value={data.description}
                  onChange={handleChange}
                />
              </label>
              <label name='image_url'>
                <span>Image link:</span>
                <br />
                <input
                  type='text'
                  name='image_url'
                  placeholder='Link'
                  value={data.image_url}
                  onChange={handleChange}
                />
              </label>

              <Button color='primary' type='submit'>
                Add
              </Button>
            </form>
          </FormWrapper>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TopNineForm;
