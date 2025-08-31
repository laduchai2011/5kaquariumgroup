import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '../Header';
import Table from './component/Table';
import AddFishCode from './component/AddFishCode';
import MessageDialog from '@src/component/MessageDialog';
import MainLoading from '@src/component/MainLoading';
import { ListContext } from './context';
import { useNavigate } from 'react-router-dom';
import type { ListContextInterface } from './type';
import type { MessageDataInterface } from '@src/component/MessageDialog/type';


const List: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })

   
    useEffect(() => {
        const appRole = sessionStorage.getItem("appRole");
        if (appRole !== 'admin') {
            navigate('/notadmin')
        }
    }, [navigate])

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

    const valueContext: ListContextInterface = {
        setIsLoading,
        setMessage
    }

    if (sessionStorage.getItem("appRole") === 'admin') {
        return (
            <ListContext.Provider value={valueContext}>
                <div className="List">
                    <div>
                        <Header />
                    </div>
                    {isLoading && <MainLoading />}
                    {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
                    <div className='List-main'>
                        <div>
                            <div>
                                <Table />
                            </div>
                            <div>
                                <AddFishCode />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </ListContext.Provider>
        );
    }
   
};

export default List;
