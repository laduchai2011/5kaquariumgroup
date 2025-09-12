import { FC, memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import RowOrder from './RowOrder';
import OrderProduct from './OrderProduct';
import { OrderField } from '@src/dataStruct/order';
import { PagedOrderField } from '@src/dataStruct/order';




const ListOrder: FC<{
    data: PagedOrderField | undefined, 
    selectedOrder: OrderField | undefined,
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrderField | undefined>>
}> = ({data, selectedOrder, setSelectedOrder}) => {
    

    useEffect(() => {
        setSelectedOrder(undefined)
    }, [data, setSelectedOrder])

    const list_order = data?.items.map((item, index) => {
        return <RowOrder data={item} key={item.id} index={index} selectedData={selectedOrder} onSelected={() => setSelectedOrder(item)} />
    })


    return (
        <div className={style.parent}>
            <h3>Danh sách giỏ hàng hoặc đơn hàng</h3>
            {data ? <div className={style.table}>
                <div className={`${style.row} ${style.rowHeader}`}>
                    <div className={style.rowIndex}>Stt</div>
                    <div className={style.rowLabel}>Nhãn</div>
                    <div className={style.rowTotal}>Tổng (VND)</div>
                    <div className={style.rowNote}>Ghi chú</div>
                </div>
                { list_order }
            </div> : <div>Không có dữ liệu</div>}
            <OrderProduct selectedOrder={selectedOrder} />
        </div>
    )
}

export default memo(ListOrder);