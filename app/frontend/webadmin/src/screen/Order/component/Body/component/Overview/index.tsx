import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import type { PagedOrderField, OrderFilterField } from '@src/dataStruct/order';
import { OrderContext } from '@src/screen/Order/context';
import { useGetOrdersWithFilterQuery } from '@src/redux/query/orderRTK';


const Overview: React.FC = () => {
    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in Overview component cant undefined !");
    }
    const {
        setIsLoading,
        setOrderFilter
    } = orderContext;

    const [allOrder, setAllOrder] = useState<PagedOrderField | undefined>(undefined)
    const [orderOrder, setOrderOrder] = useState<PagedOrderField | undefined>(undefined)
    const [confirmOrder, setConfirmOrder] = useState<PagedOrderField | undefined>(undefined)
    const [sendOrder, setSendOrder] = useState<PagedOrderField | undefined>(undefined)
    const [receiveOrder, setReceiveOrder] = useState<PagedOrderField | undefined>(undefined)

    const orderFilter_Overview: OrderFilterField = {
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
    }


    const handleSelectOrderStatus = (orderStatus: string): OrderFilterField => {
        const value = orderStatus;
        const orderFilter_cp = {...orderFilter_Overview};
        const orderProcess_cp = {...orderFilter_cp.orderProcess};
        switch(value) { 
            case 'all': { 
                orderFilter_cp.isOrderProcess = false;
                break; 
            } 
            case 'order': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = false;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'confirm': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'send': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = true;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'receive': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = true;
                orderProcess_cp.isReceive = true;
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        }

        orderFilter_cp.orderProcess = orderProcess_cp;

        return orderFilter_cp;
    }

    const {
        data: data_allOrders, 
        // isFetching, 
        isLoading: isLoading_allOrders,
        isError: isError_allOrders, 
        error: error_allOrders
    } = useGetOrdersWithFilterQuery(handleSelectOrderStatus('all'));
    useEffect(() => {
        if (isError_allOrders && error_allOrders) {
            console.error(error_allOrders);
        }
    }, [isError_allOrders, error_allOrders])
    useEffect(() => {
        setIsLoading(isLoading_allOrders);
    }, [isLoading_allOrders, setIsLoading])
    useEffect(() => {
        if (data_allOrders?.isSuccess && data_allOrders.data) {
            setAllOrder(data_allOrders.data)
        }
    }, [data_allOrders]) 

    const {
        data: data_orderOrders, 
        // isFetching, 
        isLoading: isLoading_orderOrders,
        isError: isError_orderOrders, 
        error: error_orderOrders
    } = useGetOrdersWithFilterQuery(handleSelectOrderStatus('order'));
    useEffect(() => {
        if (isError_orderOrders && error_orderOrders) {
            console.error(error_orderOrders);
        }
    }, [isError_orderOrders, error_orderOrders])
    useEffect(() => {
        setIsLoading(isLoading_orderOrders);
    }, [isLoading_orderOrders, setIsLoading])
    useEffect(() => {
        if (data_orderOrders?.isSuccess && data_orderOrders.data) {
            setOrderOrder(data_orderOrders.data)
        }
    }, [data_orderOrders]) 

    const {
        data: data_confirmOrders, 
        // isFetching, 
        isLoading: isLoading_confirmOrders,
        isError: isError_confirmOrders, 
        error: error_confirmOrders
    } = useGetOrdersWithFilterQuery(handleSelectOrderStatus('confirm'));
    useEffect(() => {
        if (isError_confirmOrders && error_confirmOrders) {
            console.error(error_confirmOrders);
        }
    }, [isError_confirmOrders, error_confirmOrders])
    useEffect(() => {
        setIsLoading(isLoading_confirmOrders);
    }, [isLoading_confirmOrders, setIsLoading])
    useEffect(() => {
        if (data_confirmOrders?.isSuccess && data_confirmOrders.data) {
            setConfirmOrder(data_confirmOrders.data)
        }
    }, [data_confirmOrders]) 

    const {
        data: data_sendOrders, 
        // isFetching, 
        isLoading: isLoading_sendOrders,
        isError: isError_sendOrders, 
        error: error_sendOrders
    } = useGetOrdersWithFilterQuery(handleSelectOrderStatus('send'));
    useEffect(() => {
        if (isError_sendOrders && error_sendOrders) {
            console.error(error_sendOrders);
        }
    }, [isError_sendOrders, error_sendOrders])
    useEffect(() => {
        setIsLoading(isLoading_sendOrders);
    }, [isLoading_sendOrders, setIsLoading])
    useEffect(() => {
        if (data_sendOrders?.isSuccess && data_sendOrders.data) {
            setSendOrder(data_sendOrders.data)
        }
    }, [data_sendOrders]) 

    const {
        data: data_receiveOrders, 
        // isFetching, 
        isLoading: isLoading_receiveOrders,
        isError: isError_receiveOrders, 
        error: error_receiveOrders
    } = useGetOrdersWithFilterQuery(handleSelectOrderStatus('receive'));
    useEffect(() => {
        if (isError_receiveOrders && error_receiveOrders) {
            console.error(error_receiveOrders);
        }
    }, [isError_receiveOrders, error_receiveOrders])
    useEffect(() => {
        setIsLoading(isLoading_receiveOrders);
    }, [isLoading_receiveOrders, setIsLoading])
    useEffect(() => {
        if (data_receiveOrders?.isSuccess && data_receiveOrders.data) {
            setReceiveOrder(data_receiveOrders.data)
        }
    }, [data_receiveOrders]) 

    const handleGetOrder = (orderStatus: string) => {
        setOrderFilter(handleSelectOrderStatus(orderStatus))
    }
    
    
    
    
    
    return (
        <div className="Order_Overview">
            <div onClick={() => handleGetOrder('all')}>
                <div>Tổng</div>
                {allOrder?.totalCount && <div>{allOrder?.totalCount}</div>}
            </div>
            <div onClick={() => handleGetOrder('order')}>
                <div>Đã đặt</div>
                {orderOrder?.totalCount && <div>{orderOrder?.totalCount}</div>}
            </div>
            <div onClick={() => handleGetOrder('confirm')}>
                <div>Đã xác nhận</div>
                {confirmOrder?.totalCount && <div>{confirmOrder?.totalCount}</div>}
            </div>
            <div onClick={() => handleGetOrder('send')}>
                <div>Đã gửi</div>
                { sendOrder?.totalCount && <div>{sendOrder?.totalCount}</div>}
            </div>
            <div onClick={() => handleGetOrder('receive')}>
                <div>Đã nhận</div>
                {receiveOrder?.totalCount && <div>{receiveOrder?.totalCount}</div>}
            </div>
        </div>
    );
};

export default Overview;
