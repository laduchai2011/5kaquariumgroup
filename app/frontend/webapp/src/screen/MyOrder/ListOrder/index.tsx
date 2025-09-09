import { memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import RowOrder from './RowOrder';
import { OrderField } from '@src/dataStruct/order';
import { useGetShoppingCartsQuery } from '@src/redux/query/orderRTK';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';




const ListOrder = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [orders, setOrders] = useState<OrderField[]>([])
    const [selectedOrder, setSelectedOrder] = useState<OrderField>()
    const [totalCount, setTotalCount] = useState<number>(10);
    const [page, setPage] = useState<string>('1');
    const size = '5';

    const {
        data: data_ShoppingCart, 
        // isFetching, 
        isLoading: isLoading_ShoppingCart,
        isError: isError_ShoppingCart, 
        error: error_ShoppingCart
    } = useGetShoppingCartsQuery({page: page, size: size});
    useEffect(() => {
        if (isError_ShoppingCart && error_ShoppingCart) {
            console.error(error_ShoppingCart);
            dispatch(set_message({
                message: 'Đã có lỗi xảy ra !',
                type: 'error'
            }))
        }
    }, [dispatch, isError_ShoppingCart, error_ShoppingCart])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_ShoppingCart))
    }, [dispatch, isLoading_ShoppingCart])
    useEffect(() => {
        if (data_ShoppingCart?.isSuccess && data_ShoppingCart.data) {
            setTotalCount(data_ShoppingCart.data.totalCount)
            setOrders(data_ShoppingCart.data.items)
        }
    }, [data_ShoppingCart]) 
    
    const list_order = orders.map((data, index) => {
        return <RowOrder data={data} key={data.id} index={index} />
    })


    return (
        <div className={style.parent}>
            <h3>Danh sách giỏ hàng hoặc đơn hàng</h3>
            <div className={style.table}>
                <div className={`${style.row} ${style.rowHeader}`}>
                    <div className={style.rowIndex}>Stt</div>
                    <div className={style.rowLabel}>Nhãn</div>
                    <div className={style.rowTotal}>Tổng (VND)</div>
                    <div className={style.rowNote}>Ghi chú</div>
                </div>
                { list_order }
            </div>
        </div>
    )
}

export default memo(ListOrder);