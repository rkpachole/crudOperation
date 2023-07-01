import React from "react";
import AddUser from "./Components/AddUser/Index";
import "./App.css";
import List from "./Components/List/Index";
import {
  BrowserRouter as Router, Route} from "react-router-dom";
function App() {

  return (
    <div className="App">
    <Router>
    <Route exact path ="/list" component = {List} />
    <Route exact path ="/" component = {AddUser} />
   
    
    </Router>

    </div>
  );
}
export default App;