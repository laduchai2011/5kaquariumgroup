import { useState } from 'react';
import './style.css';
import Header from '../Header';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import Customer from './component/Customer';
import Order from './component/Order';
import type { MessageDataInterface } from '@src/component/MessageDialog/type';


const CreateOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

    return (
        <div className="CreateOrder">
            <div>
                <Header />
            </div>
            {isLoading && <MainLoading />}
            {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
            <div className='CreateOrder-main'>
                <Customer />
                <Order />
            </div>
        </div>
    );
};

export default CreateOrder;
