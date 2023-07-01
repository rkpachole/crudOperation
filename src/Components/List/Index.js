import './List.css';
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Model from "../Edit/Index";
// import AddUser from "../AddUser/Index";


export const List = (props) => {
  const [isEdit, setIsEdit] = useState([]);
  const [users, setUsers] = useState([]);
  const [serach, setSerach] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const[status,setStatus]=useState(false);



  const fetchSearchData = async (se) => {
    await fetch(`http://localhost:3000/posts/?name_like=${se.trim()}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))

  };

  useEffect(() => {
    fetchDataList()
  }, [props,status])
  
  useEffect(() => {
    fetchSearchData(serach);
  }, [serach]);


  const fetchDataList = async () => {
    await fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setUsers(data))
  };



  const onDelete = async (id) => {
  await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })

          );
        }
      })

  };

  const handleDelete = (id) => {
    onDelete(id);
  };
  const onCloseModal = (cc) => {
    // console.log(props)
    setStatus(cc)
    setOpenModel(false);
  };



  const onOpenModal = (data, id) => {
    setId(id);
    setIsEdit(data);
    setOpenModel(!openModel);
  }


  return (
    <div className="List">
    <label>Serach</label> <input type="text" onChange={(e) => fetchSearchData(e.target.value)}></input>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>User Select</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? users.map((item, index) => (
            <tr key={index}>
              <td><span className="user-name">{item.id}</span></td>
              <td>  <span className="user-email">{item.name}</span></td>
              <td>  <span className="user-email">{item.email}</span></td>
              <td>  <span className="user-email">{item.selectedValue}</span></td>
              <td>
                <div>
                  <Button color="secondary" className="text-right" onClick={(e) => onOpenModal(item, item.id)} >Edit</Button>
                  <Model openModel={openModel} onCloseModal={onCloseModal} onOpenModal={onOpenModal} isEdit={isEdit} />
                  <Button color="danger" className="text-right" onClick={(e) => handleDelete(item.id)}>Delete</Button>
                </div></td></tr>
          )) : "No data available"}</tbody>


      </table>



    </div>
  );
}


export default List;
