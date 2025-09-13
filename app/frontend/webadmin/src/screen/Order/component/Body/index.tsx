import React from 'react';
import './style.css';
import Overview from './component/Overview';
import Control from './component/Control';
import ListOrder from './component/ListOrder';
// import Table from './component/Table';
import ListProduct from './component/LishProduct';



const Body: React.FC = () => {
    return (
        <div className="Order_Body">
            <div className='Order_Body-main'>
                <Overview />
                <Control />
                <ListOrder />
                {/* <Table /> */}
                <ListProduct />
            </div>
        </div>
    );
};

export default Body;
