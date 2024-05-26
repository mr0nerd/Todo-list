

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <header className="app-header">
                    <h1>To-Do List Application</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<TaskList />} />
                        <Route path="/task/new" element={<TaskForm />} />
                        <Route path="/task/edit/:id" element={<TaskForm />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
