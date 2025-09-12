import { memo, useState } from 'react';
import style from './style.module.scss';


const Payment = () => {
    const [payMethod, setPayMethod] = useState<string>('cash')

    const handlePayMethod = (method: string) => {
        setPayMethod(method)
    }

    return (
        <div className={style.parent}>
            <div className={style.header}>
                Thanh toán
            </div>
            <div className={style.main}>
                <div>
                    <div>Trạng thái thanh toán: </div>
                    <div>Chưa thanh toán</div>
                </div>
                <div>
                    <div>Tổng: </div>
                    <div>1000000</div>
                </div>
                <div>
                    <div>Phương thức: </div>
                    <div>
                        <div><input type='checkbox' checked={payMethod==='cash'} onChange={() => handlePayMethod('cash')} /><div>Tiền mặt</div></div>
                        <div><input type='checkbox' checked={payMethod==='bank'} onChange={() => handlePayMethod('bank')} /><div>Chuyển khoản</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Payment);