import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css'

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const load = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API}/tasks/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch {
      toast.error("Fetch failed");
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id, status) => {
    try {
      const token = localStorage.getItem('token');

      // ✅ Allow "Pending" and "Missing" to be marked as completed/late
      if (status === "Pending" || status === "Missing") {
        await axios.put(`${process.env.REACT_APP_API}/tasks/update-status/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // ✅ Unchecking should revert to "Pending"
        await axios.put(`${process.env.REACT_APP_API}/tasks/reset-status/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      load();
    } catch {
      toast.error("Update failed");
    }
  };

  const colors = {
    "Pending": "orange",
    "Completed": "green",
    "Done Late": "goldenrod",
    "Missing": "crimson"
  };

  return (
    <div className="task-list-container">
      <select onChange={e => setFilter(e.target.value)} value={filter}>
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
        <option>Done Late</option>
        <option>Missing</option>
      </select>
      <ul>
        {tasks
          .filter(t => filter === "All" || t.status === filter)
          .map(t => (
            <li key={t._id}>
              <input
                type="checkbox"
                checked={t.status === "Completed" || t.status === "Done Late"}
                onChange={() => toggle(t._id, t.status)}
              />
              <strong>{t.title}</strong> —{" "}
              <span style={{ color: colors[t.status] }}>{t.status}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
