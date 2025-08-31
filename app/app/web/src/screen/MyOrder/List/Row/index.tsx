import { FC } from 'react';
import style from './style.module.scss';
import { OrderField } from '@src/dataStruct/order';


const Row: FC<{data: OrderField, index: number}> = ({data, index}) => {
     return (
        <div className={style.parent}>
            <div><input type='checkbox' /></div>
            <div>
                <div className={style.index}>{index}</div>
                <div className={style.image}>
                    <img src={data.image} alt='' />
                </div>
                <div className={style.title}>{data.title}</div>
                <div className={style.amount}>{data.amount}</div>
                <div className={style.money}>{data.price}</div>
            </div>
            <div>Đã mua</div>
        </div>
    )
}

export default Row;