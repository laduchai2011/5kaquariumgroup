import { FC, memo, useState } from 'react';
import style from './style.module.scss';
import { FaEdit } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaDiamondTurnRight } from "react-icons/fa6";
import { OrderField } from '@src/dataStruct/order';
import AddProduct from './component/AddProduct';



const Row: FC<{data: OrderField, index: number, onShowEdit: (data: OrderField) => void}> = ({ data, index, onShowEdit }) => {

    const [isAdd, setIsAdd] = useState<boolean>(false);

    const ShowEdit = () => {
        onShowEdit(data)
    }

    const handleShowAddProduct = () => {
        setIsAdd(true)
    }

    const handleCloseAddProduct = () => {
        setIsAdd(false)
    }

    return (
        <div className={style.parent} >
            {isAdd && <AddProduct shoppingCart={data} onClose={() => handleCloseAddProduct()} />}
            <div className={style.row}>
                <div className={style.rowIndex}>{index}</div>
                <div className={style.rowLabel}>{data.label}</div>
                <div className={style.rowTotal}>{data.total}</div>
                <div className={style.rowNote}>{data.note}</div>   
            </div>
            <div className={style.rowIcon}>
                <FaEdit onClick={() => ShowEdit()} title='Chỉnh sửa' color='green' />
                <FaCartShopping onClick={() => handleShowAddProduct()} title='Thêm sản phẩm vào giỏ hàng' color='red' />
                <FaDiamondTurnRight title='Xem chi tiết giỏ hàng' />
            </div>
        </div>
    )
}

export default memo(Row);