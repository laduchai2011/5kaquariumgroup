import React from 'react';
import './style.css';
import Overview from './component/Overview';
import Control from './component/Control';
import Table from './component/Table';



const Body: React.FC = () => {
    return (
        <div className="Order_Body">
            <div className='Order_Body-main'>
                <Overview />
                <Control />
                <Table />
            </div>
        </div>
    );
};

export default Body;
