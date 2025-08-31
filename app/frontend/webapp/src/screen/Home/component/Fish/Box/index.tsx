import { FC } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductField } from '@src/dataStruct/product';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import { set_currentProductId } from '@src/redux/slice/productSlice';



const Box: FC<{data: ProductField}> = ({data}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const goToDetail = () => {
        dispatch(set_currentProductId(data.id));
        navigate(`/product/${data.id}`);
    }

    return (
        <div className={style.parent} onClick={() => goToDetail()}>
            <div className={style.imageContainer}>
                <img src={data.image} alt='' />
                <div>{`${data.discount}%`}</div>
            </div>
            <div className={style.titleContainer}>
                <span>{data.title}</span>
                <div className={style.costContainer}>
                    <span>{data.price}</span>
                    <span>{data.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Box;