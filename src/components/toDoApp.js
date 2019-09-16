import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../store';
import { capitalizeFirstLetters } from '../common/index'
import { add } from '../actions/action';
import firebase from 'firebase'


class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            userName: "",
            data: ""
        }
    }

    gettingValue = (ev) => {
        // console.log(ev.target.value)
        if (ev.target.name === "userName") {
            ev.target.value = capitalizeFirstLetters(ev.target.value)
        }
        this.setState({
            [ev.target.name]: ev.target.value,
        }, () => {
            // console.log(this.state)
        })
    }

    add = (ev) => {
        ev.preventDefault()
        this.setState({
            data: {
                userName: this.state.userName,
                password: this.state.password
            }

        }, () => {
            this.setState({
                userName: "",
                password: ""
            })
            let users = this.props.state.users ? [...this.props.state.users, this.state.data] : [this.state.data]
            firebase.database().ref().child("WholeData").child("users").set(users)
            this.props.add(this.state.data,"addUser")
        })
    }

    viewList = () => {
        this.props.history.push("/List")
    }

    render() {
        // console.log(this.props.state)
        return (
            <div className="mainContainer">
                <div className="header">
                    <p>Redux Todo</p>
                </div>
                <div className="inputDiv">
                    <form
                        onSubmit={(ev) => this.add(ev)}
                        name="add"
                    >
                        <input
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            value={this.state.userName}
                            onChange={(ev) => this.gettingValue(ev)}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(ev) => this.gettingValue(ev)}
                            required
                        />
                        <button
                        >
                            Add
                        </button>
                    </form>
                    {this.props.state ?
                        this.props.state.users ?
                            <button
                                onClick={(ev) => this.viewList()}
                                name="List"
                            >
                                View List
                        </button>
                            : null
                        : null}
                </div>
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

const mapDispatchToProps = { add }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToDoList));