import React, { Component } from 'react'
import axios from 'axios'

class CreateUser extends Component {
    constructor(props)
    {
    super();
    this.state = {
        username : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange (e) {
        this.setState({ username: e.target.value });
      }

    onSubmit(e)
    {
        e.preventDefault();
        const user = {
        username: this.state.username,
        }
        console.log(user);
        // window.location ='/';
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }


    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>User Name</label>
                <input type="text"
                className="form-control" 
                placeholder="username"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" />
            </div>
        </form>
            </div>
        )
    }
}

export default CreateUser
