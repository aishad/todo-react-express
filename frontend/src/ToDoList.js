import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      items: []
    }
  }
  componentDidMount() {
    // This is called after the first render
    // We don't put fetches in the constructor. Why? Ask Jordan :)
    fetch('/items', {
      method: 'POST',
      body: JSON.stringify({ listName: this.props.name }) // GET is the default method, so this is optional
    })
      .then(response => response.text()) // get the HTTP response body
      .then(responseBody => {
        let parsedResponse = JSON.parse(responseBody);
        this.setState({ items: parsedResponse })
      })
  }
  handleInputChange = event => {
    let inputValue = event.target.value
    this.setState({itemInput: inputValue});
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({itemInput:""})
    let bod = JSON.stringify({listName: this.props.name, input: this.state.itemInput});
    fetch('/addItem', {
      method: 'POST', // GET is the default method, so this is optional
      body: bod
    })
      .then(response => response.text()) // get the HTTP response body
      .then(responseBody => {
        let parsedResponse = JSON.parse(responseBody);
        // The state only gets updated when the response is received
        this.setState({ items: parsedResponse })
      })
  }

  handleDelete = event =>{
    event.preventDefault();
    fetch('/delete',{
      method:"POST",
      body: JSON.stringify({ listName: this.props.name }) 
    })
    .then(response => response.text())
    .then(responseBody => {
      let parsedBody = JSON.parse(responseBody)
      this.setState({items:parsedBody})
    })
  }

  handleReverse = event =>{
    event.preventDefault();
    fetch('/reverse',{
      method:"POST",
      body: JSON.stringify({listName: this.props.name })
    })
    .then(response => response.text())
    .then(responseBody=>{
      let parsedBody = JSON.parse(responseBody)
      this.setState({items:parsedBody})
    })
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.itemInput} onChange={this.handleInputChange}></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.handleDelete}>Click to clear</button>
        <button onClick={this.handleReverse}>Click to reverse</button>
        <ul>
          {this.state.items.map(item => (<li> {item} </li>))}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
