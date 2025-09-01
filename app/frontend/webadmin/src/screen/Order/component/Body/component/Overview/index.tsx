import React from 'react';
import './style.css';


const Overview: React.FC = () => {
    return (
        <div className="Order_Overview">
            <div>
                <div>Tổng</div>
                <div>9999</div>
            </div>
            <div>
                <div>Đã đặt</div>
                <div>99</div>
            </div>
            <div>
                <div>Đã xác nhận</div>
                <div>99</div>
            </div>
            <div>
                <div>Đã gửi</div>
                <div>99</div>
            </div>
            <div>
                <div>Đã nhận</div>
                <div>9999</div>
            </div>
        </div>
    );
};

export default Overview;
