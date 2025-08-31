import React from 'react';
import './style.css';
import avatarnull from '@src/assets/avatar/avatarnull.png';
import { useNavigate } from 'react-router-dom';

const Right: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="Header_Right">
            <div onClick={() => navigate('/signin')}>Đăng nhập ở đây nè !!!!!!</div>
            <img src={avatarnull} alt="avatar" />
        </div>
    );
};

export default Right;
