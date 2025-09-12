import { FC, memo, useMemo, useEffect, useState } from 'react';
import style from './style.module.scss';
import Box from './Box';
import { OrderField, OrderProductField } from '@src/dataStruct/order';
import { useGetMyAllOrderProductsInOrderQuery } from '@src/redux/query/orderRTK';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';





const OrderProduct: FC<{selectedOrder: OrderField | undefined}> = ({selectedOrder}) => {
    const dispatch = useDispatch<AppDispatch>();

    const [allProduct, setAllProduct] = useState<OrderProductField[]>([])

    const {
        data: data_Product, 
        // isFetching, 
        isLoading: isLoading_Product,
        isError: isError_Product, 
        error: error_Product 
    } = useGetMyAllOrderProductsInOrderQuery({orderId: selectedOrder?.id.toString() || '-1'});
    useEffect(() => {
        if (isError_Product && error_Product) {
            console.error(error_Product);
            dispatch(set_message({
                message: 'Đã có lỗi khi tải sản phẩm !',
                type: 'error'
            }))
        }
    }, [dispatch, isError_Product, error_Product])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_Product))
    }, [dispatch, isLoading_Product])
    useEffect(() => {
        if (data_Product?.isSuccess && data_Product.data) {
            setAllProduct(data_Product.data)
        } else {
            setAllProduct([])
        }
        // console.log('data_Product', data_Product)
    }, [data_Product]) 
   
    const list_product = useMemo(() => {
        return allProduct.map((item, index) => (
            <div key={index}><Box data={item} index={index} /></div>
        ));
    }, [allProduct]);

    return (
        <div className={style.parent}>
            <h3>Danh sách sản phẩm của giỏ hàng hoặc đơn hàng</h3>
            <div className={style.list}>
                { list_product }
            </div>
        </div>
    )
}

export default memo(OrderProduct);