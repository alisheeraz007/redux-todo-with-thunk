import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../store';
import { capitalizeFirstLetters } from '../common/index'
import { edit } from '../actions/action';
import firebase from 'firebase'


class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: "",
            edit: false,
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

    update = () => {
        let obj = {
            userName: this.state.userName,
            password: this.state.password
        }
        firebase.database().ref().child("WholeData").child("users").child(this.props.index).update(obj)
            .then((res) => {
                this.props.edit(obj, this.props.index, "updateUser")
                this.props.editFalse()
            })
    }

    componentWillMount() {
        if (this.props.state) {
            if (this.props.state.users.length) {
                this.setState({
                    userName: this.props.state.users[this.props.index].userName,
                    password: this.props.state.users[this.props.index].password
                })
            } else {
                this.props.history.push('/')
            }
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="edit">
                <div>
                    <button className="back" onClick={(ev) => this.props.editFalse()}>
                        back
                    </button>
                </div>
                <div className="header">
                    <p>edit</p>
                </div>
                <div className="inputDiv">
                    <input
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        value={this.state.userName}
                        onChange={(ev) => this.gettingValue(ev)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(ev) => this.gettingValue(ev)}
                    />
                    <button
                        onClick={(ev) => this.update()}
                        name="add"
                    >
                        Update
                        </button>
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

const mapDispatchToProps = { edit }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit));