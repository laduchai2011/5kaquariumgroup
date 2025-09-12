import React, { useContext } from 'react';
import './style.css';
import { OrderContext } from '@src/screen/Order/context';




const ListOrder: React.FC = () => {
    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in ListOrder component cant undefined !");
    }

    const {
        orders
    } = orderContext;

    const list_order = orders.map((data, key) => {
        return (
            <div className='Order_ListOrder-row' key={data.id}>
                <div className='Order_ListOrder-row-index'>{key}</div>
                <div className='Order_ListOrder-row-label'>{data.label}</div>
                <div className='Order_ListOrder-row-total'>{data.total}</div>
                <div className='Order_ListOrder-row-note'>{data.note}</div>
            </div>
        )
    })

    return (
        <div className="Order_ListOrder">
            <div className='Order_ListOrder-row'>
                <div className='Order_ListOrder-row-index Order_ListOrder-row-header'>index</div>
                <div className='Order_ListOrder-row-label Order_ListOrder-row-header'>label</div>
                <div className='Order_ListOrder-row-total Order_ListOrder-row-header'>total</div>
                <div className='Order_ListOrder-row-note Order_ListOrder-row-header'>note</div>
            </div>
            { list_order }
        </div>
    );
};

export default ListOrder;
