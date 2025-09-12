import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '../Header';
import Body from './component/Body';
import { OrderContext } from './context';
import type { OrderContextInterface } from './type';
import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import type { OrderFilterField, OrderField, AdminOrderBodyType } from '@src/dataStruct/order';
import { useGetOrdersQuery } from '@src/redux/query/orderRTK';


const Order: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })
    const [orderFilter, setOrderFilter] = useState<OrderFilterField>({
        page: 1,
        size: 10,
        sellerId: -1,
        isOrderProcess: false,
        orderProcess: {
            id: -1,
            isOrder: false,
            isConfirm: false,
            confirmUser: false,
            isSend: false,
            sendUser: false,
            isReceive: false,
            orderId: -1,
            updateTime: '',
            createTime: ''
        }
    })
     const [orderBody, setOrderBody] = useState<AdminOrderBodyType>({
        page: 1,
        size: 10,
        isProcess: false,
        process: {
            id: -1,
            isOrder: false,
            isConfirm: false,
            confirmUser: false,
            isSend: false,
            sendUser: false,
            isReceive: false,
            orderId: -1,
            updateTime: '',
            createTime: ''
        }
    })
    const [orders, setOrders] = useState<OrderField[]>([])
    const [totalCount, setTotalCount] = useState<number>(10);

    const {
        data: data_orders, 
        // isFetching, 
        isLoading: isLoading_orders,
        isError: isError_orders, 
        error: error_orders
    } = useGetOrdersQuery(orderBody);
    useEffect(() => {
        if (isError_orders && error_orders) {
            console.error(error_orders);
        }
    }, [isError_orders, error_orders])
    useEffect(() => {
        setIsLoading(isLoading_orders);
    }, [isLoading_orders])
    useEffect(() => {
        if (data_orders?.isSuccess && data_orders.data) {
            setTotalCount(data_orders.data.totalCount);
            setOrders(data_orders.data.items);
        } else {
            setTotalCount(0);
            setOrders([]);
        }
    }, [data_orders]) 

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

    const valueContext: OrderContextInterface = {
        orders,
        totalCount: totalCount,
        setIsLoading,
        setMessage,
        orderFilter,
        setOrderFilter,
        orderBody,
        setOrderBody
    }

    return (
        <OrderContext.Provider value={valueContext}>
            <div className="Order">
                <Header />
                {isLoading && <MainLoading />}
                {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
                <Body />
            </div>
        </OrderContext.Provider>
    );
};

export default Order;
