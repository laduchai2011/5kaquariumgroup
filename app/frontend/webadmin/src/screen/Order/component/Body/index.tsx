import React from 'react';
import './style.css';
import Overview from './component/Overview';
import Control from './component/Control';



const Body: React.FC = () => {
    return (
        <div className="Order_Body">
            <div className='Order_Body-main'>
                <Overview />
                <Control />
            </div>
        </div>
    );
};

export default Body;
