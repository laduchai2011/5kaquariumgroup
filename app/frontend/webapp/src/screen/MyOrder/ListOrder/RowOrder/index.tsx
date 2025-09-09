import { FC, memo, useRef } from 'react';
import style from './style.module.scss';
import { OrderField } from '@src/dataStruct/order';


const RowOrder: FC<{data: OrderField, index: number}> = ({ data, index }) => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    
    const handleSelected = () => {
        if (parent_element.current) {
            parent_element.current.classList.toggle(style.parrentSelected)
        }
    }

    return (
       <div className={style.parent} onClick={() => handleSelected()} ref={parent_element}>
            <div className={style.rowIndex}>{ index }</div>
            <div className={style.rowLabel}>{ data.label }</div>
            <div className={style.rowTotal}>{ data.total }</div>
            <div className={style.rowNote}>{ data.note }</div>
        </div>
    )
}

export default memo(RowOrder);