import React from 'react';
import './style.css';
import { IoClose } from "react-icons/io5";
import type { MessageInterface } from './type';



const MessageDialog: React.FC<MessageInterface> = ({message, type, onClose}) => {

    let textColor = 'white';

    if (type === 'error') {
        textColor = 'red';
    }

    if (type === 'warn') {
        textColor = 'yellow';
    }

    if (type === 'success') {
        textColor = 'green';
    }

    if (type === 'normal') {
        textColor = 'white';
    }

    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <div className='MessageDialog'>
            <div>
                <div><IoClose onClick={() => handleClose()} title='Đóng' size={25} /></div>
                <div style={{color: textColor}}>{message}</div>
            </div>
        </div>
    )
}

export default MessageDialog;