import { useRef, useEffect, useContext, useState } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { ProfileContext } from '../context';
import { AccountField } from '@src/dataStruct/account';
import { useChangeAvatarMutation } from '@src/redux/query/accountRTK';
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import { IMAGE_API } from '@src/const/api/account';


const ChangeAvatar = () => {
    const profileContext = useContext(ProfileContext)

    if (!profileContext) {
        throw new Error("profileContext in ChangeAvatar component cant undefined !");
    }

    const {
        isShow_ChangeAvatar,
        set_isShow_ChangeAvatar, 
        setIsLoading, 
        setMessage
    } = profileContext;

    const [changeAvatar] = useChangeAvatarMutation();

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        }
    }, [preview])

    const closeDialogAddAddress = () => {
        set_isShow_ChangeAvatar(false)
    }

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(IMAGE_API.UPLOAD_AIMAGE, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // console.log("Uploaded:", res.data.file);
            return res;
        } catch (err) {
            console.error(err);
            setMessage({
                message: 'Thay đổi ảnh đại diện thất bại !',
                type: 'error'
            })
        }
    };

    const handleChangeAvatar = async () => {
        setIsLoading(true);

        const res = await handleUpload();

        if (res === undefined) {
            setMessage({
                message: 'Thay đổi ảnh đại diện thất bại !',
                type: 'error'
            })
        }

        const avatarUrl = IMAGE_API.GET_IMAGE + '/' + res?.data.file;
        
        const account: AccountField = {
            id: -1,
            userName: '',
            password: '',
            phone: '',
            firstName: '',
            lastName: '',
            avatar: avatarUrl,
            status: '',
            updateTime: ''
        }

        changeAvatar(account)
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false))
       
    }

    if (isShow_ChangeAvatar) {
        return (
            <div className={style.parent}>
                <div>
                    <div><IoClose onClick={() => closeDialogAddAddress()} title='Đóng' size={25} /></div>
                    <div><h2>Thay đổi ảnh đại diện</h2></div>
                    <div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <FaUpload
                                title='Chọn ảnh'
                                size={30}
                                style={{ cursor: "pointer" }}
                                color='greenyellow'
                                onClick={handleIconClick}
                            />
                        </div>
                        <div>
                            {preview && <img src={preview} alt="preview" width={200} />}
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleChangeAvatar()}>Đồng ý</button>
                    </div>
                </div>
            </div>
        )
    }

    return
}

export default ChangeAvatar;