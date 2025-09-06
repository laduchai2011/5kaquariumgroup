import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import { FaImage } from "react-icons/fa";
import { IMAGE_API } from '@src/const/api/image';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import axios from 'axios';
import type { ProductField } from '@src/dataStruct/product';
import type { FishCodeField } from '@src/dataStruct/fishCode';
import TextEditorDisplay from '@src/component/TextEditorDisplay';
import { useGetAFishCodeWithIdQuery } from '@src/redux/query/fishCodeRTK';
import { useAddProductMutation } from '@src/redux/query/productRTK';
import { useLocation } from "react-router-dom";
import { isNumber } from '@src/utility/string';


interface UploadImageResponse {
    file: string;
}

const CreateProduct: React.FC = () => {
    const location = useLocation();
    const fishCodeId = location?.state?.fishCodeId;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })
    const [product, setProduct] = useState<ProductField>({
        id: -1,
        title: '',
        image: '',
        name: '',
        size: '',
        amount: '',
        sold: '',
        discount: '',
        fishCodeInProduct: '',
        price: '',
        status: '',
        userId: -1,
        fishCodeId: -1,
        updateTime: '',
        createTime: '',
    })
    const [fishCode, setFishCode] = useState<FishCodeField | undefined>(undefined)

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        }
    }, [preview])

    const [addProduct] = useAddProductMutation()

    const {
        data: data_fishCode, 
        // isFetching, 
        isLoading: isLoading_fishCode,
        isError, 
        error
    } = useGetAFishCodeWithIdQuery({id: fishCodeId}, { skip: !fishCodeId });

    useEffect(() => {
        if (isError && error) {
            console.error(error);
            setMessage({
                message: 'Tải mã cá không thành công !',
                type: 'error'
            })
        }
    }, [isError, error, setMessage])

    useEffect(() => {
        setIsLoading(isLoading_fishCode);
    }, [isLoading_fishCode, setIsLoading])

    useEffect(() => {
        setFishCode(data_fishCode);
        setProduct((pre) => {
            return {
                ...pre,
                name: data_fishCode?.name || '',
                size: data_fishCode?.size || '',
                fishCodeId: data_fishCode?.id || -1
            }
        })
    }, [data_fishCode]) 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;

        switch(field) { 
            case 'title': { 
                setProduct({...product, title: value})
                break; 
            } 
            case 'amount': { 
                setProduct({...product, amount: value})
                if (!isNumber(value)) {
                    setMessage({
                        message: 'Trường số lượng không phải là số !',
                        type: 'error'
                    })
                }
                break; 
            } 
            case 'discount': { 
                setProduct({...product, discount: value})
                if (!isNumber(value)) {
                    setMessage({
                        message: 'Trường khuyến mại không phải là số !',
                        type: 'error'
                    })
                }
                break; 
            } 
            case 'fishCodeInProduct': { 
                setProduct({...product, fishCodeInProduct: value})
                if (!isNumber(value)) {
                    setMessage({
                        message: 'Trường số lượng cá trên mỗi số lượng sản phẩm không phải là số !',
                        type: 'error'
                    })
                }
                break; 
            } 
            case 'price': { 
                setProduct({...product, price: value})
                if (!isNumber(value)) {
                    setMessage({
                        message: 'Trường giá không phải là số !',
                        type: 'error'
                    })
                }
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        } 
    }

    const handleUpload = async (): Promise<UploadImageResponse | null> => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post<UploadImageResponse>(IMAGE_API.UPLOAD_AIMAGE, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            setMessage({
                message: 'Tải ảnh lên thất bại !',
                type: 'error'
            })
            return null;
        }
    };

    const isOke_checkFinalString = () => {
        const product_cp = {...product}
        product_cp.title = product_cp.title.trim();
        product_cp.amount = product_cp.amount.trim()
        product_cp.discount = product_cp.discount.trim()
        product_cp.price = product_cp.price.trim()
        product_cp.fishCodeInProduct = product_cp.fishCodeInProduct.trim()

        if (!isNumber(product_cp.amount)) {
            setMessage({
                message: 'Trường số lượng không phải là số !',
                type: 'error'
            })
            return false
        } else if (!isNumber(product_cp.discount)) {
            setMessage({
                message: 'Trường khuyến mại không phải là số !',
                type: 'error'
            })
            return false
        } else if (!isNumber(product_cp.price)) {
            setMessage({
                message: 'Trường giá không phải là số !',
                type: 'error'
            })
            return false
        } else if (!isNumber(product_cp.fishCodeInProduct)) {
            setMessage({
                message: 'Trường số lượng cá trên mỗi số lượng sản phẩm không phải là số !',
                type: 'error'
            })
            return false
        }
        setProduct(product_cp)
        return true
    }

    const handleCreate = async () => {
        if (data_fishCode) {
            if (isOke_checkFinalString()) {
                const data = await handleUpload();

                if (data === null) {
                    setMessage({
                        message: 'Tạo sản phẩm thất bại !',
                        type: 'error'
                    })
                }

                if (data?.file) {
                    const imageUrl = IMAGE_API.GET_IMAGE + '/' + data.file;
                    const product_cp = {...product};
                    product_cp.title = product_cp.title.trim()
                    product_cp.image = imageUrl;
                    product_cp.amount = product_cp.amount.trim()
                    product_cp.discount = product_cp.discount.trim()
                    product_cp.price = product_cp.price.trim()
                    product_cp.fishCodeInProduct = product_cp.fishCodeInProduct.trim()
                    setIsLoading(true);
                    addProduct(product_cp)
                    .then(res => {
                        if (res.data?.isSuccess) {
                            setMessage({
                                message: 'Tạo sản phẩm thành công !',
                                type: 'success'
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        setMessage({
                            message: 'Tạo sản phẩm thất bại !',
                            type: 'error'
                        })
                    })
                    .finally(() => setIsLoading(false))
                } else {
                    setMessage({
                        message: 'Tạo sản phẩm thất bại !',
                        type: 'error'
                    })
                }
            } else {
                // đã được check trong isOke_checkFinalString
            }
        } else {
            setMessage({
                message: 'Không tìm thấy mã cá nào để tạo sản phẩm !',
                type: 'error'
            })
        }   
    }

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

       
    return (
        <div className="CreateProduct">
            {isLoading && <MainLoading />}
            {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
            <div className='CreateProduct-main'>
                <h2>Tạo sản phẩm</h2>
                <div className='CreateProduct-main1'>
                    <div>
                        <div className='CreateProduct-inputContainer'>
                            <div>Tiêu đề</div>
                            <input value={product.title} onChange={(e) => handleChangeInput(e, 'title')} />
                        </div>
                        <div className='CreateProduct-inputContainer'>
                            <div>Số lượng</div>
                            <input value={product.amount} onChange={(e) => handleChangeInput(e, 'amount')} />
                        </div>
                        <div className='CreateProduct-inputContainer'>
                            <div>Khuyến mại</div>
                            <input value={product.discount} onChange={(e) => handleChangeInput(e, 'discount')} />
                        </div>
                        <div className='CreateProduct-inputContainer'>
                            <div>Giá</div>
                            <input value={product.price} onChange={(e) => handleChangeInput(e, 'price')} />
                        </div>
                        <div className='CreateProduct-inputContainer'>
                            <div>Số lượng cá trên mỗi số lượng sản phẩm</div>
                            <input value={product.fishCodeInProduct} onChange={(e) => handleChangeInput(e, 'fishCodeInProduct')} />
                        </div>
                        <div className='CreateProduct-imageIcon'>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <FaImage 
                                title='Chọn ảnh'
                                size={30}
                                style={{ cursor: "pointer" }}
                                color='greenyellow'
                                onClick={handleIconClick}
                            /> 
                        </div>
                        <div className='CreateProduct-imageContainer'>
                            {preview.length > 0 && <img src={preview} alt='' />}
                        </div>
                        <div className='CreateProduct-btnContainer'>
                            <button onClick={() => handleCreate()}>Tạo</button>
                        </div>
                    </div>
                    <div className='CreateProduct-fishCode'>
                        <div>
                            <h4>Thông tin mã cá</h4>
                        </div>
                        <div className='CreateProduct-fishCode-infor'>
                            <div>
                                <div>Tên</div>
                                <div>{fishCode?.name}</div>
                            </div>
                            <div>
                                <div>Kích thước</div>
                                <div>{fishCode?.size}</div>
                            </div>
                            <div>
                                <div>Số lượng</div>
                                <div>{fishCode?.amount}</div>
                            </div>
                            <div>
                                <div>Giá</div>
                                <div>{fishCode?.price}</div>
                            </div>
                            <div>
                                <div>Chi tiết</div>
                                <div>
                                    {fishCode?.detail && <TextEditorDisplay data={fishCode?.detail} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
