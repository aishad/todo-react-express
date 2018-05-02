import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList'

class App extends Component {

  render() {
    return (<div style = {{"display":"flex"}}>
       <div><ToDoList name="first"></ToDoList></div>
       <div><ToDoList name="second"></ToDoList></div>
       <div><ToDoList name="third"></ToDoList></div>
      </div>
    );
  }
}

export default App;
