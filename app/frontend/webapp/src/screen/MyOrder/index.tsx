import { useState, useEffect } from 'react';
import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import Control from './Control';
import ListOrder from './ListOrder';
import Payment from './Payment';
import Buy from './Buy';
import { ORDER } from '@src/const/text';
import { useGetMyOrdersQuery } from '@src/redux/query/orderRTK';
import { PagedOrderField, GetMyOrderBodyType, OrderField } from '@src/dataStruct/order';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import type { AppDispatch, RootState } from '@src/redux';
import { useSelector, useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';







const MyOrder = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.globalSlice.isLoading);
    const message = useSelector((state: RootState) => state.globalSlice.message);
    const [data, setData] = useState<PagedOrderField | undefined>(undefined);
    const [selectedOrder, setSelectedOrder] = useState<OrderField | undefined>(undefined)
    const [getMyOrderBody, setGetMyOrderBody] = useState<GetMyOrderBodyType>({
        page: 1,
        size: 5,
        order: {
            id: -1,
            label: '',
            total: '',
            note: '',
            status: '',
            userId: -1,
            updateTime: '',
            createTime: ''
        },
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
        },
        isProcess: false
    })
    
    const {
        data: data_, 
        // isFetching, 
        isLoading: isLoading_,
        isError, 
        error
    } = useGetMyOrdersQuery(getMyOrderBody);
    useEffect(() => {
        if (isError && error) {
            console.error(error);
        }
    }, [isError, error])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_))
    }, [dispatch, isLoading_])
    useEffect(() => {
        setData(data_?.data)
    }, [data_]) 


    const handleCloseMessage = () => {
        dispatch(set_message({...message, message: ''}))
    }

    return (
        <div className={style.parent}>
            <div className={style.headerLeft}><HeaderLeft header={ORDER} /></div>
            <div className={style.headerTop}><HeaderTop header={ORDER} /></div>
            {isLoading && <MainLoading />}
            {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
            <div>
                <div className={style.main}>
                    <div>
                        <Control data={data} getMyOrderBody={getMyOrderBody} setGetMyOrderBody={setGetMyOrderBody} />
                        <ListOrder data={data} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
                        <Payment />
                        <Buy selectedOrder={selectedOrder} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder;