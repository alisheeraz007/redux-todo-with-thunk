import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import ToDoList from './components/toDoApp'
import List from './components/List'
import { getData } from './actions/action';
import { connect } from 'react-redux'
import firebase from 'firebase';
import config from './config/configKey'

firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    // firebase.database().ref().child("WholeData").on('value', (snap) => {
    //   let obj;
    //   if (snap.val()) {
    //     obj = {
    //       type: "WholeData",
    //       payload: snap.val()
    //     }
    //     this.props.getData(obj.payload)
    //   }
    // })
    firebase.database().ref("WholeData").once('value').then((snap) => {
      let obj;
      if (snap.val()) {
        obj = {
          type: "WholeData",
          payload: snap.val()
        }
        this.props.getData(obj.payload)
      }
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Route
            exact path="/"
            render={() => <ToDoList
              state={this.state}
            />} />
          <Route
            exact path="/List"
            render={() => <List
              state={this.state}
            />} />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    state
  }
}

const matchDispatchToProps = { getData }

export default connect(mapStateToProps, matchDispatchToProps)(App);
