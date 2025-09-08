import { FC, memo } from 'react';
import style from './style.module.scss';
import { FaEdit } from "react-icons/fa";
import { OrderField } from '@src/dataStruct/order';



const Row: FC<{data: OrderField, index: number, onShowEdit: (data: OrderField) => void}> = ({ data, index, onShowEdit }) => {

    const ShowEdit = () => {
        onShowEdit(data)
    }

    const handleSelectedShoppingCart = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        if (checked) {
            // setSelectedShoppingCart(data)
        }
    }

    return (
        <div className={style.parent} >
            <div className={style.row}>
                <div className={style.rowIndex}>{index}</div>
                <div className={style.rowLabel}>{data.label}</div>
                <div className={style.rowTotal}>{data.total}</div>
                <div className={style.rowNote}>{data.note}</div>   
            </div>
            <input className={style.rowSelect} checked={true} onChange={(e) => handleSelectedShoppingCart(e)} type='checkbox' />
            <div className={style.rowIcon}>
                <FaEdit onClick={() => ShowEdit()} title='Chỉnh sửa' color='green' />
            </div>
        </div>
    )
}

export default memo(Row);