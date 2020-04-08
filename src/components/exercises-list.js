import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class ExerciseList extends Component {
    constructor(props){
        super();
        this.state={
            exercises: []
        }
    }
    componentDidMount()
    {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data
                })
            })
        // this.delete = this.delete.bind(this);   
    }

    delete = (id) => {
        // event.preventDefault();
        axios.delete('http://localhost:5000/exercises/'+id)
         .then(res => console.log(res.data))

        this.setState({
            exercises : this.state.exercises.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
    <table className="table mt-5">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Duration</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {this.state.exercises.map((exercise, id) => (
           <tr key={exercise._id}>
          <th scope="row">1</th>
          <td>{exercise.username}</td>
          <td>{exercise.duration}</td>
          <td>{exercise.date}</td>
          <td>
               <span>
              <button className="btn btn-danger" onClick={this.delete.bind(this,exercise._id)}>Delete</button>
              <button className="btn btn-info ml-2"><Link to={"/edit/"+exercise._id}><span style={{color:'white'}}>Edit</span></Link></button>
              </span>
          </td>
        </tr>
      ))}
    
  </tbody>
</table>

            </div>
        )
    }
}

export default ExerciseList
