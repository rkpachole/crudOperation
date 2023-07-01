import React, { useState, useEffect } from "react";
import { Input, Button, Label, } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import List from "../List/Index";
import User from "./User/Index";
import axios from "axios";


export const AddUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false)
  const [model, setModal] = useState(false);
  const [userType, setUserType] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
 
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(name== ""){
      alert("Please enter email");
    }
    const data = { name, email,selectedValue };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/posts", requestOptions)
      .then(response => response.json())
      .then((data) => {
        setStatus(true);
        setUsers((users) => [...users, data]);
        addCloseModel()
      });

  };


  const getData = (data) => {
    fetchDataList ();
  }
  const toggle = () => setModal(!model);



  const addCloseModel = () => {
    setModal(false);
    setEmail("")
    setName("")
  }


  useEffect(() => {
    fetchDataList ();
  
  }, [props])

  const fetchDataList = async () => {
    await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUserType(data))
       
  };
  const onChangeHandle = (e) =>{
    console.log(e.target.value);
    setSelectedValue(e.target.value)
  }
  return (
    <div>

      <Button color="danger" className="text-right" onClick={toggle}>
        Add User
      </Button>
      <Modal isOpen={model} onCloseModal={addCloseModel} >

        <ModalHeader toggle={addCloseModel}>Add User</ModalHeader>
        <ModalBody>
          <div className="form-group row">
            <div className="col">
              <Label> Name <strong className="text-danger">*</strong></Label>
              <Input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div><br />
            <div className="col">
              <Label>Email <strong className="text-danger">*</strong></Label>
              <Input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

          </div>
          <div className="form-group">
            
          <label>User  <strong className="text-danger">*</strong></label>
          <select 
              className="form-control chosen-select"
              value={userType.name}
              onChange={(e)=> onChangeHandle(e)}
          >
           <option>select User</option>
            {userType.length > 0 ? userType.map((item,index)=>(
              <option key={index} value={item.name}>{item.name}</option>
            )
              
            ):""}                              
          </select>
          
      </div>

          <div className="form-group row">
      
          <div className="col">
            <Label>Add User Type <strong className="text-danger">*</strong></Label><br />
           
            <User OnSubmit={getData}/>
          </div>
       </div>
         

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOnSubmit}>Save </Button>
          <Button color="secondary" onClick={addCloseModel}>Cancle</Button>
        </ModalFooter>
      </Modal>
      <List status={status} />
    </div>
  );
};
export default AddUser;