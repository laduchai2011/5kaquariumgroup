import { useContext } from 'react';
import style from './style.module.scss';
import { GrFormNext, GrFormPrevious  } from "react-icons/gr";
import { MyOrderContext } from '../context';


const Control = () => {
    const myOrderContext = useContext(MyOrderContext)
    if (!myOrderContext) {
        throw new Error("myOrderContext in Control component cant undefined !");
    }
    const {
        totalCount,
        page,
        setPage
    } = myOrderContext;

    const handleNextPage = () => {
        setPage(pre => {
            const page_ = Number(pre);
            if (page_ < handlePageNumber()) {
                return (page_ + 1).toString()
            }
            return pre;  
        })
    }

    const handleBackPage = () => {
        setPage(pre => {
            const page_ = Number(pre);
            if (page_ > 1) {
                return (page_ - 1).toString()
            }
            return pre;  
        })
    }

    const handlePageNumber = (): number => {
        if (totalCount) {
            const kqn = Math.floor(totalCount / 10);
            const kqd = totalCount % 10;
            let pageNumber = 0;
            if (kqd > 0) {
                pageNumber = kqn + 1;
            } else {
                pageNumber = kqn;
            }
            return pageNumber;
        }
        return 10;
    }

    return (
        <div className={style.parent}>
            <div>
                <div className={style.iconContainer}>
                    <GrFormPrevious onClick={() => handleBackPage()} size={20} />
                    <GrFormNext onClick={() => handleNextPage()} size={20} />
                </div>
                <div>{`${page} / ${handlePageNumber()}`}</div>
                <div className={style.selectContainer}>
                    <select>
                        <option value="all">Tất cả</option>
                        <option value="rder">Đã mua</option>
                        <option value="confirm">Đã được xác nhận</option>
                        <option value="send">Đã gửi</option>
                        <option value="receive">Đã nhận</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Control;