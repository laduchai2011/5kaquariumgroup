import { FC, memo, useState } from 'react';
import style from './style.module.scss';
import { GrFormNext, GrFormPrevious  } from "react-icons/gr";
import { PagedOrderField, GetMyOrderBodyType } from '@src/dataStruct/order';


const Control: FC<{
    data: PagedOrderField | undefined, 
    getMyOrderBody: GetMyOrderBodyType,
    setGetMyOrderBody: React.Dispatch<React.SetStateAction<GetMyOrderBodyType>>
}> = ({data, getMyOrderBody, setGetMyOrderBody}) => {
    const [orderStatus, setOrderStatus] = useState<string>('all')
    const page = getMyOrderBody.page;

    const handleNextPage = () => {
        let page_ = page;
        if (page_ < handlePageNumber()) {
            page_ = page_ + 1
        }

        setGetMyOrderBody(pre => {
            return {
                ...pre,
                page: page_
            }
        })
    }

    const handleBackPage = () => {
        let page_ = page;
        if (page_ > 1) {
            page_ = page_ - 1
        }

        setGetMyOrderBody(pre => {
            return {
                ...pre,
                page: page_
            }
        })
    }

    const handlePageNumber = (): number => {
        const totalCount = data?.totalCount
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

    const handleSelectOrderStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const getMyOrderBody_cp = {...getMyOrderBody};
        const process_cp = {...getMyOrderBody_cp.process};
        setOrderStatus(value)
        switch(value) { 
            case 'all': { 
                getMyOrderBody_cp.isProcess = false;
                break; 
            } 
            case 'shoppingCart': { 
                getMyOrderBody_cp.isProcess = false;
                process_cp.isOrder = false;
                process_cp.isConfirm = false;
                process_cp.isSend = false;
                process_cp.isReceive = false;
                break; 
            } 
            case 'order': { 
                getMyOrderBody_cp.isProcess = true;
                process_cp.isOrder = true;
                process_cp.isConfirm = false;
                process_cp.isSend = false;
                process_cp.isReceive = false;
                break; 
            } 
            case 'confirm': { 
                getMyOrderBody_cp.isProcess = true;
                process_cp.isOrder = true;
                process_cp.isConfirm = true;
                process_cp.isSend = false;
                process_cp.isReceive = false;
                break; 
            } 
            case 'send': { 
                getMyOrderBody_cp.isProcess = true;
                process_cp.isOrder = true;
                process_cp.isConfirm = true;
                process_cp.isSend = true;
                process_cp.isReceive = false;
                break; 
            } 
            case 'receive': { 
                getMyOrderBody_cp.isProcess = true;
                process_cp.isOrder = true;
                process_cp.isConfirm = true;
                process_cp.isSend = true;
                process_cp.isReceive = true;
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        }

        getMyOrderBody_cp.process = process_cp;
        setGetMyOrderBody(getMyOrderBody_cp);
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
                    <select value={orderStatus} onChange={(e) => handleSelectOrderStatus(e)} required>
                        <option value="all">Tất cả</option>
                        <option value="shoppingCart">Giỏ hàng</option>
                        <option value="order">Đã mua</option>
                        <option value="confirm">Đã được xác nhận</option>
                        <option value="send">Đã gửi</option>
                        <option value="receive">Đã nhận</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default memo(Control);