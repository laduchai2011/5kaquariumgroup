import React, { useContext } from 'react';
import './style.css';
import { TfiArrowLeft, TfiArrowRight  } from "react-icons/tfi";
import { OrderContext } from '@src/screen/Order/context';


const Control: React.FC = () => {

    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in Control component cant undefined !");
    }

    const {
        orderFilter,
        setOrderFilter,
        totalCount
    } = orderContext;

    const handleNextPage = () => {
        const orderFilter_cp = {...orderFilter}
        const currentPage = orderFilter_cp.page;
        if (currentPage < handlePageNumber()) {
            const newPage = currentPage + 1;
            orderFilter_cp.page = newPage;
        }
        setOrderFilter(orderFilter_cp)
    }

    const handleBackPage = () => {
        const orderFilter_cp = {...orderFilter}
        const currentPage = orderFilter_cp.page;
        if (currentPage > 1) {
            const newPage = currentPage + 1;
            orderFilter_cp.page = newPage;
        }
        setOrderFilter(orderFilter_cp)
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

    const handleSelectOrderStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const orderFilter_cp = {...orderFilter};
        const orderProcess_cp = {...orderFilter_cp.orderProcess};
        switch(value) { 
            case 'all': { 
                orderFilter_cp.isOrderProcess = false;
                break; 
            } 
            case 'order': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = false;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'confirm': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'send': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = true;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'receive': { 
                orderFilter_cp.isOrderProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = true;
                orderProcess_cp.isReceive = true;
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        }

        orderFilter_cp.orderProcess = orderProcess_cp;
    }

    const handleValueOrderStatus = (): string => {
        const orderFilter_cp = {...orderFilter};
        const orderProcess_cp = {...orderFilter_cp.orderProcess};
        if (orderFilter_cp.isOrderProcess === false) {
            return 'all'
        } else {
            if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === false && orderProcess_cp.isSend === false && orderProcess_cp.isReceive === false) {
                return 'order'
            } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === true && orderProcess_cp.isSend === false && orderProcess_cp.isReceive === false) {
                return 'confirm'
            } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === true && orderProcess_cp.isSend === true && orderProcess_cp.isReceive === false) {
                return 'send'
            } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === true && orderProcess_cp.isSend === true && orderProcess_cp.isReceive === true) {
                return 'receive'
            }
            return 'all'
        }
         
    }

    return (
        <div className="Order_Control">
            <div>
                <div>Người bán</div>
                <div>
                    <select>
                        <option value="all">Tất cả</option>
                    </select>
                </div>
            </div>
            <div>
                <div>Trạng thái đơn hàng</div>
                <div>
                    <select defaultValue={handleValueOrderStatus()} onChange={(e) => handleSelectOrderStatus(e)} required>
                        <option value="all">Tất cả</option>
                        <option value="order">Đã mua</option>
                        <option value="confirm">Đã được xác nhận</option>
                        <option value="send">Đã gửi</option>
                        <option value="receive">Đã nhận</option>
                    </select>
                </div>
            </div>
            <div className='Order_Control-pageContainer'>
                <div>{`${orderFilter.page}/${handlePageNumber()}`}</div>
                <div>
                    <TfiArrowLeft onClick={() => handleBackPage()} />
                    <TfiArrowRight onClick={() => handleNextPage()} />
                </div>
            </div>
        </div>
    );
};

export default Control;
