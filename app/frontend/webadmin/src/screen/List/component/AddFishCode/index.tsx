import React, { useState, useContext } from 'react';
import './style.css';
import TextEditor from './component/TextEditor';
import type { FishCodeField } from '@src/dataStruct/fishCode';
import { useAddFishCodeMutation } from '@src/redux/query/fishCodeRTK';
import { ListContext } from '../../context';




const AddFishCode: React.FC = () => {
    const listContext = useContext(ListContext)
    if (!listContext) {
        throw new Error("listContext in AddFishCode component cant undefined !");
    }
    const {
        setIsLoading,
        setMessage
    } = listContext;

    const [fishCodeField, setFishCodeField] = useState<FishCodeField>({
        id: -1,
        name: '',
        size: '',
        amount: '',
        price: '',
        detail: '',
        status: '',
        userId: -1,
        updateTime: '',
        createTime: '',
    })

    const [addFishCode] = useAddFishCodeMutation();

    const handleSaveEditorText = (data: string) => {
        setFishCodeField({...fishCodeField, detail: data})
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;

        switch(field) { 
            case 'name': { 
                setFishCodeField({...fishCodeField, name: value})
                break; 
            } 
            case 'size': { 
                setFishCodeField({...fishCodeField, size: value})
                break; 
            } 
            case 'amount': { 
                setFishCodeField({...fishCodeField, amount: value})
                break; 
            } 
            case 'price': { 
                setFishCodeField({...fishCodeField, price: value})
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        } 
    }

    const handleAdd = async () => {
        const fishCodeField_cp = {...fishCodeField}
        fishCodeField_cp.name = fishCodeField_cp.name.trim()
        fishCodeField_cp.size = fishCodeField_cp.size.trim()
        fishCodeField_cp.amount = fishCodeField_cp.amount.trim()
        fishCodeField_cp.price = fishCodeField_cp.price.trim()
        setIsLoading(true);
        addFishCode(fishCodeField_cp)
        .then(res => {
            console.log('addFishCode', res)
            if (res.data?.isSuccess) {
                setMessage({
                    message: 'Thêm mã cá thành công !',
                    type: 'success'
                })
            } else {
                setMessage({
                    message: 'Thêm mã cá KHÔNG thành công !',
                    type: 'error'
                })
            }
        })
        .catch(err => {
            console.error(err);
            setMessage({
                message: 'Thêm mã cá KHÔNG thành công !',
                type: 'error'
            })
        })
        .finally(() => setIsLoading(false))
    }

    return (
        <div className="List-AddFishCode">
            <div className='List-AddFishCode-header'>
                Thêm vào danh sách
            </div>
            <div>
                <div className='List-AddFishCode-input'>
                    <div>Tên</div>
                    <div><input value={fishCodeField.name} onChange={(e) => handleInputChange(e, 'name')} /></div>
                </div>
                <div className='List-AddFishCode-input'>
                    <div>Kích thước</div>
                    <div><input value={fishCodeField.size} onChange={(e) => handleInputChange(e, 'size')} /></div>
                </div>
                <div className='List-AddFishCode-input'>
                    <div>Số lượng</div>
                    <div><input value={fishCodeField.amount} onChange={(e) => handleInputChange(e, 'amount')} /></div>
                </div>
                <div className='List-AddFishCode-input'>
                    <div>Giá</div>
                    <div><input value={fishCodeField.price} onChange={(e) => handleInputChange(e, 'price')} /></div>
                </div>
                <div className='List-AddFishCode-textEditor'>
                    <div>Chi tiết</div>
                    <TextEditor data={fishCodeField.detail} onSave={(data) => handleSaveEditorText(data)} />
                </div>
                <div className='List-AddFishCode-btn'>
                    <button onClick={() => handleAdd()}>Thêm</button>
                </div>
            </div>
        </div>
    );
};

export default AddFishCode;
