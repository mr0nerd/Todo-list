

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get('http://localhost:5000/tasks');
            setTasks(res.data);
        };
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h2>Tasks</h2>
                <Link to="/task/new" className="btn">Create New Task</Link>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="task-item">
                        <div className="task-info">
                            <h3>{task.title}</h3>
                            <p>{task.status} - {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p>{task.description}</p>
                        </div>
                        <div className="task-actions">
                            <Link to={`/task/edit/${task.id}`} className="btn">Edit</Link>
                            <button onClick={() => deleteTask(task.id)} className="btn btn-delete">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
