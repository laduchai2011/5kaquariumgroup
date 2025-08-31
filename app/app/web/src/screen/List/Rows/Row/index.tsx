import { FC, useRef } from 'react'
import style from './style.module.scss';
import { FishCodeField } from '@src/dataStruct/fishCode';
import TextEditorDisplay from '@src/component/TextEditorDisplay';
import { useNavigate } from 'react-router-dom';
import { MdArrowRight } from "react-icons/md";


const Row: FC<{isHeader: boolean, data?: FishCodeField, index?: number}> = ({isHeader, data, index}) => {
     const navigate = useNavigate();
    const textEditorDisplayContainer_element = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        if (textEditorDisplayContainer_element.current) {
            textEditorDisplayContainer_element.current.classList.toggle(style.textEditorDisplayContainer_show)
        }
    }

    const goToProduct = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        navigate(
            '/',
            {
                state: {
                    fishCodeId: data?.id
                },
            }
        );
    }

    if (isHeader) {
        return (
            <div className={style.parent}>
                <div>
                    <div className={style.index} style={{fontWeight: 600}}>Stt</div>
                    <div className={style.name} style={{fontWeight: 600}}>Tên</div>
                    <div className={style.size} style={{fontWeight: 600}}>Kích thước</div>
                    <div className={style.amount} style={{fontWeight: 600}}>Số lượng</div>
                    <div className={style.price} style={{fontWeight: 600}}>Giá</div>
                    <div className={style.icon} style={{fontWeight: 600}}></div>
                </div>
                <div></div>
            </div>
        )
    }
    return (
        <div className={style.parent} onClick={() => handleClick()}>
            <div>
                <div className={style.index}>{index}</div>
                <div className={style.name}>{data?.name}</div>
                <div className={style.size}>{data?.size}</div>
                <div className={style.amount}>{data?.amount}</div>
                <div className={style.price}>{data?.price}</div>
                <div className={style.icon}><MdArrowRight onClick={(e) => goToProduct(e)} size={25} /></div>
            </div>
            <div className={style.textEditorDisplayContainer} ref={textEditorDisplayContainer_element}>
                {data?.detail && <TextEditorDisplay data={data.detail} />}
            </div>
        </div>
    )
}

export default Row;