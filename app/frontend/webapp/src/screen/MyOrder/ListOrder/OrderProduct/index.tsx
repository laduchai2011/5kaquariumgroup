import { FC, memo, useMemo } from 'react';
import style from './style.module.scss';
import Box from './Box';
import { OrderField } from '@src/dataStruct/order';




const OrderProduct: FC<{selectedOrder: OrderField | undefined}> = ({selectedOrder}) => {
   
    const list_product = useMemo(() => {
        return [1,2,3,4,5,6,7,8].map((item, index) => (
            <div key={index}><Box index={index} /></div>
        ));
    }, []);

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