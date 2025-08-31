import React from 'react';
import './style.css';
import Table1 from '@src/component/Table1';

const Body: React.FC = () => {
    return (
        <div className="Order_Body">
            <div>OrderJT_Body</div>
            <div>
                <Table1 />
            </div>
        </div>
    );
};

export default Body;
