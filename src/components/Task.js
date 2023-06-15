import React from 'react'
export default function Task(props) {
    let color = "";
    if (props.task.status === "Pending") {
        color = "danger";
    }
    else if (props.task.status === "Completed") {
        color = "success";
    }
    else {
        color = "info";
    }
    return (
        <tr>
            <th scope="row">{props.sno}</th>
            <td>{props.task.title}</td>
            <td>{props.task.description}</td>
            <td><span className={`badge text-bg-${color}`}>{props.task.status}</span></td>
            <td>
                <i title='Mark as completed' className="fa-solid fa-circle-check me-1" onClick={() => props.handleMarkCompleted(props.task._id)}></i>
                <i title='Edit Task' className="fa-sharp fa-solid fa-pen-to-square me-1" onClick={() => props.handleEdit(props.task._id)}></i>
                <i title='Delete Task' className="fa-solid fa-trash" onClick={() => props.handleDelete(props.task._id)}></i>
            </td>
        </tr>
    )
}
