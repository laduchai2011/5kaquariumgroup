import React, { useContext } from 'react';
import './style.css';
import { OrderContext } from '@src/screen/Order/context';
import Row from './component/Row';


const Table: React.FC = () => {
    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in Table component cant undefined !");
    }

    const {
        orders
    } = orderContext;


    const list_order = orders.map((data, key) => {
        return (
            <Row data={data} index={key} key={data.id} />
        )
    })

    return (
        <div className="Order_Table">
            <div>
                <div className='Order_Table-row'>
                    <div className='Order_Table-row-index Order_Table-row-header'>Stt</div>
                    <div className='Order_Table-row-image Order_Table-row-header'>Hình ảnh</div>
                    <div className='Order_Table-row-name Order_Table-row-header'>Tên</div>
                    <div className='Order_Table-row-size Order_Table-row-header'>Kích thước</div>
                    <div className='Order_Table-row-amount Order_Table-row-header'>Số lượng</div>
                    <div className='Order_Table-row-fishCodeInProduct Order_Table-row-header'>FIP</div>
                    <div className='Order_Table-row-fishAmount Order_Table-row-header'>Số lượng cá</div>
                    <div className='Order_Table-row-money Order_Table-row-header'>Tiền</div>
                    <div className='Order_Table-row-isPay Order_Table-row-header'>Thanh toán</div>
                    <div className='Order_Table-row-seller Order_Table-row-header'>Người bán</div>
                    <div className='Order_Table-row-customer Order_Table-row-header'>Khách hàng</div>
                    <div className='Order_Table-row-title Order_Table-row-header'>Tiêu đề</div>
                </div>
                {/* { list_order } */}
            </div>
        </div>
    );
};

export default Table;
