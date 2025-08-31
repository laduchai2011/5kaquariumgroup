import React from 'react';
import './style.css';
import Left from './component/Left';
import Center from './component/Center';
import Right from './component/Right';

const Header: React.FC = () => {
    return (
        <div className="Header">
            <div>
                <Left />
            </div>
            <div>
                <Center />
            </div>
            <div>
                <Right />
            </div>
        </div>
    );
};

export default Header;
