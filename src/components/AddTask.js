import React, { useState } from 'react'
import Tasks from './Tasks';

export default function AddTask(props) {
    const [editActive, setEditActive] = useState(false);
    const { tasks, setTasks, setTriggerAlert, setAlertMessage } = props;
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: ""
    })

    const handleOnChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTask.title === "" || newTask.description === "" || newTask.status === "") {
            alert("Cannot add empty task");
            return;
        }
        try {
            await fetch("https://task-manager-backend-z56o.onrender.com/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.log(error);
        }
        setTasks([...tasks, newTask]);
        setNewTask({
            title: "",
            description: "",
            status: ""
        })
        setAlertMessage("Task added successfully");
        setTriggerAlert(true);
        setInterval(() => {
            setTriggerAlert(false)
        }, 2000)
    }

    const handleEdit = (id) => {
        const editTaskData = tasks.filter((item) => {
            return item._id === id;
        })
        localStorage.setItem("taskID", id);
        setNewTask(editTaskData[0]);
        setEditActive(true);
    }

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (newTask.title === "" || newTask.description === "" || newTask.status === "") {
            alert("Cannot add empty task");
            return;
        }
        await fetch("https://task-manager-backend-z56o.onrender.com/editTask", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "task-id": localStorage.getItem("taskID")
            },
            body: JSON.stringify({
                title: newTask.title,
                description: newTask.description,
                status: newTask.status
            })
        })
        setAlertMessage("Task edited successfully....Refreshing data!");
        setTriggerAlert(true);
        setInterval(() => {
            setTriggerAlert(false);
            window.location.reload();
        }, 2000)
    }

    return (
        <div className="container">
            <h1 className='text-center my-2'>Task Manager Tool</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={newTask.title} name='title' onChange={handleOnChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea rows="5" type="text" className="form-control" id="description" value={newTask.description} name='description' onChange={handleOnChange} required />
                </div>
                <label htmlFor="autoSizingSelect">Status</label>
                <select className="form-select" id="autoSizingSelect" name='status' onChange={handleOnChange} value={newTask.status} required>
                    <option value="" disabled>Choose</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Marked for Review">Mark for Review</option>
                </select>
                {
                    editActive ? <button type="submit" className="btn btn-warning mt-2" onClick={handleSaveEdit}>Save Changes</button>
                        : <button type="submit" className="btn btn-success mt-2" onClick={handleSubmit}>Add Task</button>
                }
            </form>
            <Tasks tasks={tasks} setTasks={setTasks} handleEdit={handleEdit} setAlertMessage={setAlertMessage} setTriggerAlert={setTriggerAlert} />
        </div>
    )
}
