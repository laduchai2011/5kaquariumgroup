import { FC, memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import { OrderProductField } from '@src/dataStruct/order';




const Box: FC<{data: OrderProductField, index: number}> = ({ data, index }) => {
    const [moneyTotal, setMoneyTotal] = useState({
        old: 0,
        new: 0
    })

    useEffect(() => {
        const handleMoney = (amount: string) => {
            const discount = data.discount;
            const price = data.price;
            if (amount && discount && price) {
                const amount_number = Number(amount);
                const discount_number = Number(discount);
                const price_number = Number(price);

                const oldTotal = amount_number * price_number;
                const discountTotal = oldTotal * (discount_number / 100);
                const newTotal = oldTotal - discountTotal;

                setMoneyTotal({
                    old: oldTotal,
                    new: newTotal
                })
            }
        }
        handleMoney(data.amount)
    }, [data])

    

    return (
        <div className={style.parent}>
            <div className={style.imageContainer}>
                <div>{ index }</div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81wfne7PM8l2XgGCedB5nidONyjb-RjgLLA&s' alt='' />
                <div><div>Xem sản phẩm</div></div>
            </div>
            <div className={style.contentContainer}>
                <div>{ data.title }</div>
                <div>
                    <div>{ data.name }</div>
                    <div>{ data.size }</div>
                </div>
                <div>
                    <div>{ data.amount }</div>
                    <div>
                        <div>{`${moneyTotal.new} vnd`}</div>
                        <div>{`${moneyTotal.old} vnd`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Box);