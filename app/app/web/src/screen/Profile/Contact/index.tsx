import { useContext, useState, useEffect, memo } from 'react';
import style from './style.module.scss';
import { ProfileContext } from '../context';
import { useGetContactsQuery } from '@src/redux/query/accountRTK';
import { ContactField } from '@src/dataStruct/account';
import Row from './component/Row';
import { getCookie } from '@src/utility/cookie';


const Contact = () => {
    const profileContext = useContext(ProfileContext);
    
    if (!profileContext) {
        throw new Error("profileContext in AddContact component cant undefined !");
    }

    const {
        set_isShow_AddContact,
        setIsLoading
    } = profileContext;

    const [contacts, setContacts] = useState<ContactField[]>([]);
    const [selectedContact, setSelectedContact] = useState<ContactField | undefined>(undefined);

    useEffect(() => {
        const _selectedContact = getCookie('selectedContact');
        if (_selectedContact) {
            setSelectedContact(JSON.parse(_selectedContact))
        }
    }, [])

    const {
        data, 
        // isFetching, 
        isLoading,
        isError, 
        error
    } = useGetContactsQuery();

    useEffect(() => {
        if (isError && error) {
            console.error(error);
        }
    }, [isError, error])

    useEffect(() => {
        setIsLoading(isLoading)
    }, [setIsLoading, isLoading])

    useEffect(() => {
        if (data) {
            setContacts(data);
        }
    }, [data]) 

    const openDialogAddContact = () => {
        set_isShow_AddContact(true)
    }

    const rowArray = contacts.map((item) => {
        return  <Row key={item.id} contact={item} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
    });

    return (
        <div className={style.parent}>
            <div className={style.header}>
                Liên hệ
            </div>
            <div className={style.inforContainer}>
                { rowArray }
            </div>
            <div className={style.addContainer}>
                <div onClick={() => openDialogAddContact()}>Thêm liên hệ</div>
            </div>
        </div>
    )
}

export default memo(Contact);