import { useState, useEffect } from 'react';
import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import Control from './Control';
import ListOrder from './ListOrder';
import List from './List';
import Total from './Total';
import { MY_ORDER } from '@src/const/text';
import { useGetMyOrdersQuery } from '@src/redux/query/orderRTK';
import { PagedOrderField } from '@src/dataStruct/order';
import { MyOrderContext } from './context';
import { MyOrderContextInterface } from './type';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import type { AppDispatch, RootState } from '@src/redux';
import { useSelector, useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';






const MyOrder = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.globalSlice.isLoading);
    const message = useSelector((state: RootState) => state.globalSlice.message);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<PagedOrderField | undefined>(undefined);
    const [page, setPage] = useState<string>('1');
    const size = '10';
    // const [message, setMessage] = useState<MessageDataInterface>({
    //     message: '',
    //     type: 'normal'
    // })
    
    const {
        data: data_, 
        // isFetching, 
        isLoading: isLoading_,
        isError, 
        error
    } = useGetMyOrdersQuery({page: page, size: size});
    
    useEffect(() => {
        if (isError && error) {
            console.error(error);
        }
    }, [isError, error])

    useEffect(() => {
        dispatch(set_isLoading(isLoading_))
    }, [dispatch, isLoading_])

    useEffect(() => {
        setData(data_)
    }, [data_]) 


    const handleCloseMessage = () => {
        dispatch(set_message({...message, message: ''}))
    }

    const valueContext: MyOrderContextInterface = {
        orders: data?.items,
        totalCount: data?.totalCount,
        page: page,
        setPage: setPage,
        // setIsLoading,
        // setMessage
    }

    return (
        <div className={style.parent}>
            <div className={style.headerLeft}><HeaderLeft header={MY_ORDER} /></div>
            <div className={style.headerTop}><HeaderTop header={MY_ORDER} /></div>
            {isLoading && <MainLoading />}
            {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
            <MyOrderContext.Provider value={valueContext}>
                <div>
                    <div className={style.main}>
                        <div>
                            <Control />
                            <ListOrder />
                            {/* <List />
                            <Total /> */}
                        </div>
                    </div>
                </div>
            </MyOrderContext.Provider> 
        </div>
    )
}

export default MyOrder;