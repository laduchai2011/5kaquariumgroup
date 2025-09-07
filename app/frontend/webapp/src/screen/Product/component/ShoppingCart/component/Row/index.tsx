import { FC, useContext } from 'react';
import style from './style.module.scss';
import { FaEdit } from "react-icons/fa";
import { OrderField } from '@src/dataStruct/order';
import { ProductContext } from '@src/screen/Product/context';



const Row: FC<{data: OrderField, index: number}> = ({ data, index }) => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShoppingCart-Row component cant undefined !");
    }
    const {
        setShoppingCartEdit,
    } = productContext;

    const ShowEdit = () => {
        setShoppingCartEdit(pre => {
            return {...pre, isShow: true}
        })
    }

    return (
        <div className={style.parent} >
            <div className={style.row}>
                <div className={style.rowIndex}>{index}</div>
                <div className={style.rowLabel}>{data.label}</div>
                <div className={style.rowTotal}>{data.total}</div>
                <div className={style.rowNote}>{data.note}</div>   
            </div>
            <input className={style.rowSelect} type='checkbox' />
            <div className={style.rowIcon}>
                <FaEdit onClick={() => ShowEdit()} title='Chỉnh sửa' color='green' />
            </div>
        </div>
    )
}

export default Row;