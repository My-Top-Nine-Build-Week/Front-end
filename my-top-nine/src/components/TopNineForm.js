import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalBody
} from "reactstrap";

import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 50%;
`;

const TopNineForm = props => {
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    image_url: ""
  });

  const onsubmit = event => {
    event.preventDefault();
    const addItem = {
      ...formInput
    };

    props.newItem(addItem);
    // teamMembers.push(formInput);
    console.log(addItem);
    setFormInput({
      title: "",
      description: "",
      image_url: ""
    });
  };

  const onchange = event => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value
    });
  };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className='form-btn'>
      {" "}
      <Button color='light' onClick={toggle} id='btn-color'>
        <i className='fas fa-plus-circle'></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <FormWrapper>
            <Form onSubmit={onsubmit}>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  type='text'
                  name='title'
                  id='Title'
                  placeholder='Title'
                  value={formInput.title}
                  onChange={onchange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='description'>Description</Label>
                <Input
                  type='textarea'
                  name='text'
                  id='Description'
                  value={formInput.description}
                  onChange={onchange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='file'>File</Label>
                <Input
                  type='file'
                  name='file'
                  id='File'
                  value={formInput.image_url}
                  onChange={onchange}
                />
                <FormText color='muted'></FormText>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </FormWrapper>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TopNineForm;
