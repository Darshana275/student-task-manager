import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = e => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success("✅ Logged in");

      // ✅ Easiest fix: force page reload to re-trigger routing
      window.location.href = '/tasks';
    } catch {
      toast.error("❌ Login failed");
    }
  };

  return (
    <div className="login-box">
     <form onSubmit={onSubmit}>
       <h2>Login</h2>
       <input required name="email" type="email" placeholder="Email" onChange={onChange} />
       <input required name="password" type="password" placeholder="Password" onChange={onChange} />
       <button type="submit">Login</button>
       <p>New? <Link to="/register">Register</Link></p>
     </form>
    </div>
  );
}
