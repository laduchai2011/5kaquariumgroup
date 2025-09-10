import { FC, memo } from 'react';
import style from './style.module.scss';




const Box: FC<{index: number}> = ({ index }) => {
   
    return (
        <div className={style.parent}>
            <div className={style.imageContainer}>
                <div>{ index }</div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81wfne7PM8l2XgGCedB5nidONyjb-RjgLLA&s' alt='' />
                <div><div>Xem sản phẩm</div></div>
            </div>
            <div className={style.contentContainer}>
                <div>
                    title Danh sách sản phẩm của giỏ hàng hoặc đơn hàng Danh sách sản phẩm của giỏ hàng hoặc đơn hàng title Danh sách sản phẩm của giỏ hàng hoặc đơn hàng Danh sách sản phẩm của giỏ hàng hoặc đơn hàng
                </div>
                <div>
                    <div>ten</div>
                    <div>size</div>
                </div>
                <div>
                    <div>so luong</div>
                    <div>tien</div>
                </div>
            </div>
        </div>
    )
}

export default memo(Box);