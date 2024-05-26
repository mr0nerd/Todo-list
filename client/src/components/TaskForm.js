

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    });

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                const res = await axios.get(`http://localhost:5000/tasks/${id}`);
                setTask(res.data);
            };
            fetchTask();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`http://localhost:5000/tasks/${id}`, task);
        } else {
            await axios.post('http://localhost:5000/tasks', task);
        }
        navigate('/');
    };

    return (
        <div className="task-form">
            <h2>{id ? 'Edit Task' : 'New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select name="status" value={task.status} onChange={handleChange}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-submit">Save</button>
            </form>
        </div>
    );
};

export default TaskForm;
