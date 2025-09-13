import React, { useContext } from 'react';
import './style.css';
import { OrderContext } from '@src/screen/Order/context';
import type { OrderField } from '@src/dataStruct/order';




const ListOrder: React.FC = () => {
    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in ListOrder component cant undefined !");
    }

    const {
        orders,
        setSelectedOrder
    } = orderContext;

    const handleSelectedOrder = (item: OrderField) => {
        setSelectedOrder(item)
    }

    const list_order = orders.map((item, key) => {
        return (
            <div className='Order_ListOrder-row' key={item.id} onClick={() => handleSelectedOrder(item)}>
                <div className='Order_ListOrder-row-index'>{key}</div>
                <div className='Order_ListOrder-row-label'>{item.label}</div>
                <div className='Order_ListOrder-row-total'>{item.total}</div>
                <div className='Order_ListOrder-row-note'>{item.note}</div>
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
