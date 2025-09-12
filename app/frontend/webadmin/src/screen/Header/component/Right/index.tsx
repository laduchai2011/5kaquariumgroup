import React, { useEffect, useState } from 'react';
import './style.css';
import avatarnull from '@src/assets/avatar/avatarnull.png';
import { useNavigate } from 'react-router-dom';




const Right: React.FC = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const appRole = sessionStorage.getItem("appRole");
        if (appRole === 'admin') {
            setIsAdmin(true)
        }
    }, [])

    return (
        <div className="Header_Right">
            {!isAdmin && <div onClick={() => navigate('/signin')}>Đăng nhập ở đây nè !!!!!!</div>}
            <img src={avatarnull} alt="avatar" />
        </div>
    );
};

export default Right;
