import { FC } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { MessageInterface } from './type';



const MessageDialog: FC<MessageInterface> = ({message, type, onClose}) => {

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
        <div className={style.parent}>
            <div>
                <div><IoClose onClick={() => handleClose()} title='Đóng' size={25} /></div>
                <div style={{color: textColor}}>{message}</div>
            </div>
        </div>
    )
}

export default MessageDialog;