import React from 'react';
import './style.css';
import Header from '../Header';
import Body from './component/Body';

const Order: React.FC = () => {
    return (
        <div className="Order">
            <div>
                <Header />
            </div>
            <div>
                <Body />
            </div>
        </div>
    );
};

export default Order;
