import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { TfiArrowLeft, TfiArrowRight  } from "react-icons/tfi";
import { OrderContext } from '@src/screen/Order/context';


const Control: React.FC = () => {

    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in Control component cant undefined !");
    }
    const {
        orderBody,
        setOrderBody,
        totalCount
    } = orderContext;

    const [orderStatus, setOrderStatus] = useState<string>('all')

    useEffect(() => {
        const handleValueOrderStatus = () => {
            const orderBody_cp = {...orderBody};
            const orderProcess_cp = {...orderBody.process};
            if (orderBody_cp.isProcess === false) {
                setOrderStatus('all')
            } else {
                if (orderProcess_cp.isOrder === false && orderProcess_cp.isConfirm === false && orderProcess_cp.isSend === false && orderProcess_cp.isReceive === false) {
                    setOrderStatus('shoppingCart')
                } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === false && orderProcess_cp.isSend === false && orderProcess_cp.isReceive === false) {
                    setOrderStatus('order')
                } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === true && orderProcess_cp.isSend === false && orderProcess_cp.isReceive === false) {
                    setOrderStatus('confirm')
                } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === true && orderProcess_cp.isSend === true && orderProcess_cp.isReceive === false) {
                    setOrderStatus('send')
                } else if (orderProcess_cp.isOrder === true && orderProcess_cp.isConfirm === true && orderProcess_cp.isSend === true && orderProcess_cp.isReceive === true) {
                    setOrderStatus('receive')
                } else {
                    setOrderStatus('all')
                }
            }
        }   
        handleValueOrderStatus()
    }, [orderBody])

    const handleNextPage = () => {
        const orderBody_cp = {...orderBody}
        const currentPage = orderBody_cp.page;
        if (currentPage < handlePageNumber()) {
            const newPage = currentPage + 1;
            orderBody_cp.page = newPage;
        }
        setOrderBody(orderBody_cp)
    }

    const handleBackPage = () => {
        const orderBody_cp = {...orderBody}
        const currentPage = orderBody_cp.page;
        if (currentPage > 1) {
            const newPage = currentPage + 1;
            orderBody_cp.page = newPage;
        }
        setOrderBody(orderBody_cp)
    }

    const handlePageNumber = (): number => {
        if (totalCount) {
            const kqn = Math.floor(totalCount / orderBody.size);
            const kqd = totalCount % orderBody.size;
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
        const orderBody_cp = {...orderBody};
        const orderProcess_cp = {...orderBody_cp.process};
        switch(value) { 
            case 'all': { 
                orderBody_cp.isProcess = false;
                break; 
            } 
            case 'shoppingCart': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = false;
                orderProcess_cp.isConfirm = false;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'order': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = false;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'confirm': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = false;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'send': { 
                orderBody_cp.isProcess = true;
                orderProcess_cp.isOrder = true;
                orderProcess_cp.isConfirm = true;
                orderProcess_cp.isSend = true;
                orderProcess_cp.isReceive = false;
                break; 
            } 
            case 'receive': { 
                orderBody_cp.isProcess = true;
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

        orderBody_cp.process = orderProcess_cp;
        setOrderBody(orderBody);
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
                <div>Người mua</div>
                <div>
                    <select>
                        <option value="all">Tất cả</option>
                    </select>
                </div>
            </div>
            <div>
                <div>Trạng thái đơn hàng</div>
                <div>
                    <select value={orderStatus} onChange={(e) => handleSelectOrderStatus(e)} required>
                        <option value="all">Tất cả</option>
                        <option value="order">Đã mua</option>
                        <option value="confirm">Đã được xác nhận</option>
                        <option value="send">Đã gửi</option>
                        <option value="receive">Đã nhận</option>
                    </select>
                </div>
            </div>
            <div className='Order_Control-pageContainer'>
                <div>{`${orderBody.page}/${handlePageNumber()}`}</div>
                <div>
                    <TfiArrowLeft onClick={() => handleBackPage()} />
                    <TfiArrowRight onClick={() => handleNextPage()} />
                </div>
            </div>
        </div>
    );
};

export default Control;
