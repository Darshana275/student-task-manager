import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
  localStorage.removeItem('token');
  navigate('/login', { replace: true });
  window.location.reload(); // 🔄 Force full reload
}, [navigate]);


  return null;
}


