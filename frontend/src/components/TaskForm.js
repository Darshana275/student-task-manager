import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function TaskForm() {
  const [task, setTask] = useState({ title:'', description:'', deadline:'' });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API}/tasks/add`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Task added");
      setTask({ title:'', description:'', deadline:'' });
    } catch {
      toast.error("Add failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input required placeholder="Title" value={task.title} onChange={e => setTask(s => ({...s,title:e.target.value}))} />
      <textarea required placeholder="Description" value={task.description} onChange={e => setTask(s => ({...s,description:e.target.value}))} />
      <input required type="date" value={task.deadline} onChange={e => setTask(s => ({...s,deadline:e.target.value}))} />
      <button>Add Task</button>
    </form>
  );
}
