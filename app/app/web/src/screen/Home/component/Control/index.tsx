import { useEffect, useContext } from 'react';
import style from './style.module.scss';
import { useGetAllFishCodesForFilterQuery } from '@src/redux/query/fishCodeRTK';
import { ProductContext } from '../../context';




const Control = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in Control component cant undefined !");
    }
    const {
        selectedFishCodeId,
        setSelectedFishCodeId
    } = productContext;
    
    const {
        data, 
        // isFetching, 
        // isLoading: isLoading_,
        isError, 
        error
    } = useGetAllFishCodesForFilterQuery();
    useEffect(() => {
        if (isError && error) {
            console.error(error);
        }
    }, [isError, error])
    // useEffect(() => {
    //     setIsLoading(isLoading_);
    // }, [isLoading_])
    // useEffect(() => {
    //     if (data_?.items) {
    //         setData(data_.items)
    //     }
    // }, [data_]) 

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedFishCodeId(Number(value))
    }

    const list = data && data.map((items) => {
        return <option key={items.id} value={items.id}>{items.name}</option>
    })

    return (
        <div className={style.parent}>
            <select id="fishCode" name="fishCode" defaultValue={selectedFishCodeId.toString()} onChange={(e) => handleSelect(e)} required>
                <option value="-1">Tất cả</option>
               {list}
            </select>
        </div>
    );
};

export default Control;
