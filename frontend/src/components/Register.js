import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post('http://localhost:5000/auth/register', form);
      toast.success("✅ Registered successfully! Please log in.");
      navigate('/login');
    } catch (err) {
      toast.error("❌ Registration failed. Try a different email.");
    }
  };

  return (
    <div className="register-box">
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input
        required
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={onChange}
      />
      <input
        required
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
      />
      <input
        required
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
      />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
    </div>
  );
}
