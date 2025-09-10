import { FC, memo, useRef, useEffect } from 'react';
import style from './style.module.scss';
import { OrderField } from '@src/dataStruct/order';


const RowOrder: FC<{
    data: OrderField, 
    index: number, 
    selectedData: OrderField | undefined,
    onSelected: () => void
}> = ({ data, index, selectedData, onSelected }) => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    
    const handleSelected = () => {
        onSelected()
    }

    useEffect(() => {
        if (parent_element.current) {
            if (selectedData) {
                if (data.id === selectedData.id) {
                    parent_element.current.classList.add(style.parrentSelected)
                } else {
                    parent_element.current.classList.remove(style.parrentSelected)
                }
            } else {
                parent_element.current.classList.remove(style.parrentSelected)
            }
        }
    }, [data, selectedData])

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