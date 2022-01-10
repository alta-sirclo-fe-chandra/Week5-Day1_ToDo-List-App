import React, { Component } from 'react'
import { FaCheck, FaRegTrashAlt, FaStickyNote } from 'react-icons/fa'

export default class todo extends Component {
    render() {
        let progres
        if (this.props.isFinish) {
            progres = 'Done'
        } else {
            progres = 'Working'
        }
        return (
            <div className='row justify-content-between my-3 border-bottom'>
                <div className='col-1 text-end'>
                    <FaStickyNote />
                </div>
                <div className="col-5">
                    <p className={`${this.props.isFinish ? 'text-decoration-line-through' : ''}`} >{this.props.task}</p>
                </div>
                <div className="col-4">
                    <p><span className={`badge rounded-pill ${this.props.isFinish ? "bg-success" : "bg-primary"}`}>{progres}</span></p>
                </div>
                <div className="col-1 text-end">
                    <button className={`btn p-0 ${this.props.isFinish ? "d-none" : ""}`} data-bs-toggle="tooltip" title="Complete Task" onClick={this.props.onClickComplete} >
                        <FaCheck />
                    </button>
                </div>
                <div className="col-1">
                    <button className='btn p-0' data-bs-toggle="tooltip" title="Delete Task" onClick={this.props.onClickDelete} >
                        <FaRegTrashAlt />
                    </button>
                </div>
            </div>
        )
    }
}
