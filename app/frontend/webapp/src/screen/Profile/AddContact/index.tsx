import { useRef, useEffect, useContext, useState } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { ProfileContext } from '../context';
import { ContactField } from '@src/dataStruct/account';
import { useAddContactMutation } from '@src/redux/query/accountRTK';


const AddContact = () => {
    const textarea_element = useRef<HTMLTextAreaElement | null>(null);
    const profileContext = useContext(ProfileContext)

    if (!profileContext) {
        throw new Error("profileContext in AddContact component cant undefined !");
    }

    const {
        isShow_AddContact,
        set_isShow_AddContact, 
        setIsLoading
    } = profileContext;

    const [addContact] = useAddContactMutation();

    const myId = sessionStorage.getItem("myId");

    const [contact, setContact] = useState<ContactField>({
        id: -1,
        name: '',
        phone: '',
        address: '',
        status: '',
        userId: Number(myId), 
        updateTime: '',
        createTime: ''
    })

    useEffect(() => {
        if (textarea_element.current) {
            textarea_element.current.addEventListener("input", () => {
                if (textarea_element.current) {
                    textarea_element.current.style.height = "auto"; // reset trước khi tính
                    textarea_element.current.style.height = `${textarea_element.current.scrollHeight + 1}` + "px"; // set theo nội dung
                }
            });
        }
    }, [])

    const closeDialogAddAddress = () => {
        set_isShow_AddContact(false)
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;

        switch(field) { 
            case 'name': { 
                setContact({...contact, name: value}) 
                break; 
            } 
            case 'phone': { 
                setContact({...contact, phone: value}) 
                break; 
            } 
            case 'address': { 
                setContact({...contact, address: value}) 
                break; 
            }
            default: { 
                break; 
            } 
        } 
    }

    const handleAddAddress = () => {
        setIsLoading(true);
        addContact(contact)
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false))
    }

    if (isShow_AddContact) {
        return (
            <div className={style.parent}>
                <div>
                    <div><IoClose onClick={() => closeDialogAddAddress()} title='Đóng' size={25} /></div>
                    <div><h2>Thêm liên hệ</h2></div>
                    <div>
                        <div>
                            <div>Tên</div>
                            <div><input value={contact.name} onChange={(e) => changeInput(e, 'name')} /></div>
                        </div>
                        <div>
                            <div>Số điện thoại</div>
                            <div><input value={contact.phone} onChange={(e) => changeInput(e, 'phone')} /></div>
                        </div>
                        <div>
                            <div>Địa chỉ</div>
                            <div><textarea ref={textarea_element} value={contact.address} onChange={(e) => changeInput(e, 'address')} /></div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleAddAddress()}>Thêm</button>
                    </div>
                </div>
            </div>
        )
    }

    return
}

export default AddContact;