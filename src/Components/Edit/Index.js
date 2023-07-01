import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input, Button, Label, } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Example(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [Id, setEditId] = useState("");
  const [status, setStatus] = useState(false);
  const [userType, setUserType] = useState([]);
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    setStatus(false)
    setEditId(props.isEdit.id);
    setEmail(props.isEdit.email);
    setName(props.isEdit.name);
    setSelectedValue(props.isEdit.selectedValue);
  }, [props])

  useEffect(() => {
    props.onCloseModal(status);

  }, [status])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = { name, email,selectedValue};
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch(`http://localhost:3000/posts/${Id}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        setStatus(true);
        setUsers((users) => [...users, data]);
        const updatedUsers = users.map((user) => {
          if (user.id !== Id) {
            user.name = name;
            user.email = email;
            user.selectedValue = selectedValue;
          }
          return user;
          // console.log(user);
        });
        // setUsers((users) => updatedUsers);

        onCloseModal();
      })

  };

  const onCloseModal = () => {
    props.onCloseModal(status);

  };

  useEffect(() => {
    fetchDataList();
  }, [])
  const fetchDataList = async () => {
    await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUserType(data))
  }

  const onChangeHandle = (e) =>{
    console.log(e.target.value);
    setSelectedValue(e.target.value)
  }
  return (
    <div>


      <Modal size="m" isOpen={props.openModel} onCloseModal={props.onCloseModal}>
        <div className="modal-content">
          <ModalHeader className="header-less ml-3" toggle={props.onCloseModal}> Edit
          </ModalHeader>
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
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>
            <div className="form-group">

              <label>User  <strong className="text-danger">*</strong></label>
              <select
                className="form-control chosen-select"
                value={selectedValue}
                onChange={(e) => onChangeHandle(e)}
              >
                {userType.length > 0 ? userType.map((item, index) => (
                  <option key={index} value={item.name}>{item.name}</option>
                )

                ) : ""}
              </select>

            </div>
          </div>
          <ModalFooter>
            <button className="btn btn-secondary" onClick={handleOnSubmit}> Update</button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}

export default Example;