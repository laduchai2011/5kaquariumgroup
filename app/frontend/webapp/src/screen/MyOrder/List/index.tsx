import { useContext } from 'react';
import style from './style.module.scss';
import Row from './Row';
import { useNavigate } from 'react-router-dom';
import { MyOrderContext } from '../context';


const List = () => {
    // const navigate = useNavigate();
    // const myOrderContext = useContext(MyOrderContext)
    // if (!myOrderContext) {
    //     throw new Error("myOrderContext in List component cant undefined !");
    // }
    // const {
    //     orders
    // } = myOrderContext;

    // const goToProduct = (id: number) => {
    //     navigate(`/product/${id}`);
    // }

    // const list_order = orders?.map((data, index) => {
    //     return <div key={data.id} onClick={() => goToProduct(data.productId)}><Row data={data} index={index} /></div>
    // })

    return (
        <div className={style.parent}>
            {/* { list_order } */}
        </div>
    )
}

export default List;