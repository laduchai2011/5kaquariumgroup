import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '../Header';
import Body from './component/Body';
import { OrderContext } from './context';
import type { OrderContextInterface } from './type';
import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import type { OrderFilterField, OrderField } from '@src/dataStruct/order';
import { useGetOrdersWithFilterMutation } from '@src/redux/query/orderRTK';



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
    const [orders, setOrders] = useState<OrderField[]>([])
    const [totalCount, setTotalCount] = useState<number>(10);
    const [getOrdersWithFilter] = useGetOrdersWithFilterMutation()

    useEffect(() => {
        setIsLoading(true);
        getOrdersWithFilter(orderFilter)
        .then(res => {
            if (res.data?.isSuccess && res.data.data) {
                setTotalCount(res.data.data?.totalCount);
                setOrders(res.data.data?.items);
            }
        })
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false))
    }, [orderFilter, getOrdersWithFilter])


    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

    const valueContext: OrderContextInterface = {
        orders : orders,
        totalCount: totalCount,
        setIsLoading,
        setMessage,
        orderFilter,
        setOrderFilter
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
