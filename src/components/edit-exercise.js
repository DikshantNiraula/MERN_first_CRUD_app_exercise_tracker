import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

class EditExercise extends Component {
    constructor(props)
    {
    super();
    this.state = {
        username : '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                datepicker: res.data.username,
                date: new Date(res.data.date),
            })
            .catch(function (error) {
                console.log(error);
            } )
        })

        axios.get('http://localhost:5000/users')
        .then(response => {
            if(response.data.length > 0)
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
        })
    }
    handleChangeDescription (e) {
        this.setState({ description: e.target.value });
      }

    handleChangeDuration (e) {
    this.setState({ duration: e.target.value });
    }
    handleChangeDate (date){
        this.setState({
            date : date
        })
    }

    onSubmit(e)
    {
        e.preventDefault();
        const exercise = {
        username: this.state.username,
        description: this.state.description,
        duration: this.state.duration,
        date: this.state.date,
        }
        console.log(exercise);
        axios.put('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(response => console.log(response.data))

        window.location ='/';
    }


    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Description</label>
                <textarea
                className="form-control"
                id="exampleFormControlTextarea1" 
                rows="3"
                value={this.state.description}
                onChange={this.handleChangeDescription}
                ></textarea>
            </div>
            <div className="form-group">
                <label>Duration</label>
                <input type="text"
                className="form-control" 
                placeholder="duration"
                onChange={this.handleChangeDuration} />
            </div>
            <div className="form-group">
                <label>Select User</label>
                <select
                className="form-control" 
                id="exampleFormControlSelect1"
                onChange={this.handleChange}>
                    {
                        this.state.users.map(function(user){
                            return <option 
                            key={user}
                            value={user}>
                                {user}
                            </option>;
                        })
                    }

                </select>
            </div>
            <div className="form-group">
                <label>Date:</label>
                <div>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChangeDate}
                    />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" />
            </div>
        </form>
            </div>
        )
    }
}

export default EditExercise
