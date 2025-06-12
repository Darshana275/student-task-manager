import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';

const TasksPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>🎓 Student Task Manager</h1>
        <button onClick={handleLogout} style={{ height: '30px' }}>Logout</button>
      </div>
      <TaskForm />
      <hr />
      <TaskList />
    </div>
  );
};

export default TasksPage;
