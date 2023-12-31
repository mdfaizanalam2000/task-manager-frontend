import React, { useEffect, useState } from 'react'
import Task from './Task';
import Spinner from "./Spinner";

export default function Tasks(props) {
    const { tasks, setTasks, handleEdit, setAlertMessage, setTriggerAlert } = props;
    const [loading, setLoading] = useState(true);
    const fetchTasks = async () => {
        try {
            const response = await fetch("https://task-manager-backend-z56o.onrender.com/getTasks", {
                method: "GET"
            })
            const tasksArray = await response.json();
            setTasks(tasksArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTasks();
        //eslint-disable-next-line
    }, [])

    const handleDelete = async (id) => {
        try {
            await fetch("https://task-manager-backend-z56o.onrender.com/deleteTask", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "task-id": id
                }
            })
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
        setAlertMessage("Task deleted successfully");
        setTriggerAlert(true);
        setInterval(() => {
            setTriggerAlert(false)
        }, 2000)
    }

    const handleMarkCompleted = async (id) => {
        await fetch("https://task-manager-backend-z56o.onrender.com/editTask", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "task-id": id
            },
            body: JSON.stringify({
                status: "Completed"
            })
        })
        setAlertMessage("Task marked as completed");
        setTriggerAlert(true);
        fetchTasks();
        setInterval(() => {
            setTriggerAlert(false)
        }, 2000)
    }

    return (
        <>
            {loading ? <Spinner />:
            tasks.length === 0 ? <h3 className='text-center mt-3'>No tasks to display</h3> :
                <div className='container'>
                    <h2 className='text-center my-2'>Your Tasks List</h2>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">SNo</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map((item, index) => {
                                        return <Task key={index} sno={index + 1} task={item} handleDelete={handleDelete} handleEdit={handleEdit} handleMarkCompleted={handleMarkCompleted} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}
