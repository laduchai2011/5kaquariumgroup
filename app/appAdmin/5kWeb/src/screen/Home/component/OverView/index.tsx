import React from 'react';
import './style.css';


const OverView: React.FC = () => {
    return (
        <div className="Home-OverView">
            <div>
                <h3>Tháng này</h3>
                <div>
                    <div>Đơn</div>
                    <div>1000</div>
                </div>
                <div>
                    <div>Doanh số</div>
                    <div>1000</div>
                </div>
                <div>
                    <div>Hoàn đơn</div>
                    <div>1000</div>
                </div>
                <div>
                    <div>Hoàn tiền</div>
                    <div>1000</div>
                </div>
            </div>
            <div>
                <h3>Tháng trước</h3>
                 <div>
                    <div>Đơn</div>
                    <div>1000</div>
                </div>
                <div>
                    <div>Doanh số</div>
                    <div>1000</div>
                </div>
                <div>
                    <div>Hoàn đơn</div>
                    <div>1000</div>
                </div>
                <div>
                    <div>Hoàn tiền</div>
                    <div>1000</div>
                </div>
            </div>
        </div>
    );
};

export default OverView;
