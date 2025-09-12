import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import type { PagedOrderField, AdminOrderBodyType } from '@src/dataStruct/order';
import { OrderContext } from '@src/screen/Order/context';
import { useGetOrdersQuery } from '@src/redux/query/orderRTK';


const Overview: React.FC = () => {
    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in Overview component cant undefined !");
    }
    const {
        setIsLoading,
        setOrderBody
    } = orderContext;

    const [allOrder, setAllOrder] = useState<PagedOrderField | undefined>(undefined)
    const [orderOrder, setOrderOrder] = useState<PagedOrderField | undefined>(undefined)
    const [confirmOrder, setConfirmOrder] = useState<PagedOrderField | undefined>(undefined)
    const [sendOrder, setSendOrder] = useState<PagedOrderField | undefined>(undefined)
    const [receiveOrder, setReceiveOrder] = useState<PagedOrderField | undefined>(undefined)

    const orderBody_Overview: AdminOrderBodyType = {
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
    }


    const handleSelectOrderStatus = (orderStatus: string): AdminOrderBodyType => {
        const value = orderStatus;
        const orderBody_cp = {...orderBody_Overview};
        const orderProcess_cp = {...orderBody_cp.process};
        switch(value) { 
            case 'all': { 
                orderBody_cp.isProcess = false;
                break; 
            } 
            case 'shoppingCart': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = false;
                orderProcess_cp.isConfirm = false;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'order': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = false;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'confirm': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'send': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = true;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'receive': { 
                orderBody_cp.isProcess = true;
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

        orderBody_cp.process = orderProcess_cp;

        return orderBody_cp;
    }

    const {
        data: data_allOrders, 
        // isFetching, 
        isLoading: isLoading_allOrders,
        isError: isError_allOrders, 
        error: error_allOrders
    } = useGetOrdersQuery(handleSelectOrderStatus('all'));
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
    } = useGetOrdersQuery(handleSelectOrderStatus('order'));
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
    } = useGetOrdersQuery(handleSelectOrderStatus('confirm'));
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
    } = useGetOrdersQuery(handleSelectOrderStatus('send'));
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
    } = useGetOrdersQuery(handleSelectOrderStatus('receive'));
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
        setOrderBody(handleSelectOrderStatus(orderStatus))
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
