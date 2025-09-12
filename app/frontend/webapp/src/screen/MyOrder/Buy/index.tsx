import { FC, memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import { OrderField } from '@src/dataStruct/order';
import { useGetMyOrderProcessInOrderQuery } from '@src/redux/query/orderRTK';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { set_isLoading } from '@src/redux/slice/globalSlice';






const Buy: FC<{
    selectedOrder: OrderField | undefined
}> = ({selectedOrder}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [orderStatus, setOrderStatus] = useState<string>('all')

    const {
        data: data_opderProcess, 
        // isFetching, 
        isLoading: isLoading_opderProcess,
        isError: isError_opderProcess, 
        error: error_opderProcess
    } = useGetMyOrderProcessInOrderQuery({orderId: selectedOrder?.id.toString() || '-1'});
    useEffect(() => {
        if (isError_opderProcess && error_opderProcess) {
            console.error(error_opderProcess);
        }
    }, [isError_opderProcess, error_opderProcess])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_opderProcess))
    }, [dispatch, isLoading_opderProcess])
    useEffect(() => {
        const handleValueOrderStatus = () => {
            const process = data_opderProcess?.data
            if (process) {
                if (process.isOrder === false && process.isConfirm === false && process.isSend === false && process.isReceive === false) {
                    setOrderStatus('shoppingCart')
                } else if (process.isOrder === true && process.isConfirm === false && process.isSend === false && process.isReceive === false) {
                    setOrderStatus('order')
                } else if (process.isOrder === true && process.isConfirm === true && process.isSend === false && process.isReceive === false) {
                    setOrderStatus('confirm')
                } else if (process.isOrder === true && process.isConfirm === true && process.isSend === true && process.isReceive === false) {
                    setOrderStatus('send')
                } else if (process.isOrder === true && process.isConfirm === true && process.isSend === true && process.isReceive === true) {
                    setOrderStatus('receive')
                } else {
                    setOrderStatus('all')
                }
            } else {
                setOrderStatus('all')
            }
            
        }   
        handleValueOrderStatus()
    }, [data_opderProcess])

    

    return (
        <div className={style.parent}>
            {orderStatus === 'shoppingCart' && <div className={style.button}>Mua</div>}
        </div>
    )
}

export default memo(Buy);