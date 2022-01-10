import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa'
import Todo from '../components/todo'

export default class index extends Component {
    state = {
        inputTask: "",
        todo: [
            { id: 1, task: "02:00 meet with Laura", isFinish: false },
            { id: 2, task: "Design a prototype", isFinish: true }
        ]
    }

    handleSubmit() {
        const { inputTask, todo } = this.state
        const random = Math.floor((Math.random() * 1000))
        const idTodo = todo.map((el) => el.id)
        const temp = {
            id: (idTodo).includes(todo.length + 1) ? random : todo.length + 1,
            task: inputTask,
            isFinish: false
        }
        todo.unshift(temp)
        this.setState({ todo: this.state.todo, inputTask: '' })
    }

    handleDelete(item) {
        const temp = this.state.todo.filter((x) => x.id !== item.id)
        this.setState({ todo: temp })
    }

    handleComplete(item) {
        this.setState({
            todo: this.state.todo.map((el) => el.id === item.id ? { ...el, isFinish: !el.isFinish } : el)
        })
    }

    render() {
        return (
            <div id='index'>
                <div className='container p-lg-4'>
                    <h1 className='fs-4 fw-bolder'>Today</h1>
                    <p className='mt-3 mb-5 text-muted'><small>Monday, Januari 10, 2022</small></p>
                    {this.state.todo.map((item) => {
                        return <Todo key={item.id} task={item.task} isFinish={item.isFinish} onClickDelete={() => this.handleDelete(item)} onClickComplete={() => this.handleComplete(item)} />
                    })}
                    <div className='row'>
                        <div className="col-1 text-end">
                            <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <FaPlus />
                            </a>
                        </div>
                        <div className="col-11">
                            <p><a className='text-decoration-none' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                Add Task
                            </a></p>
                        </div>
                    </div>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body border-0">
                            <div className="row g-3">
                                <div className="col-10">
                                    <input value={this.state.inputTask} onChange={(e) => this.setState({ inputTask: e.target.value })} className="form-control" type="text" placeholder="enter your task" />
                                </div>
                                <div className='col-2 d-grid'>
                                    <button disabled={!this.state.inputTask.length} onClick={() => this.handleSubmit()} className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
