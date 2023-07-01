import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

function Index(props) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [userType, setUserType] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const[status,setStatus]=useState(false);

  const toggle = () => {
    setModal(!modal);
    setName("");
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = { name };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/users", requestOptions)
      .then(response => response.json())
      .then((data) => {
        setUserStatus(true);
        setUserType( data);
        addCloseModel();
        
      });
    }



  const addCloseModel = () => {
    setModal(false);
    props.OnSubmit(userStatus);

  }

useEffect(()=>{

}, [props])

 
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add User
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Label>User Name</Label>
          <Input type='text'
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOnSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={addCloseModel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Index;