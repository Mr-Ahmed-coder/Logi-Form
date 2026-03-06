import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.get(`${API_URL}/api/auth/me`, config);
                setUser(res.data);
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div className="dashboard-loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-nav">
                <h2>AuthSystem</h2>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
            <div className="dashboard-content">
                <h1>Welcome, {user?.name}!</h1>
                <p>You have successfully logged in and accessed the protected dashboard.</p>
                <div className="user-details">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
