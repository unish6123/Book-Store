import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookStore from '../components/BookStore/BookStore.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const DashboardPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
       
            <div>
                <BookStore />
            </div>
        
    );
};

export default DashboardPage;
