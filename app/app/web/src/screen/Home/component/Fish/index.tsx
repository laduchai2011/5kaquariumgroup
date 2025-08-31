import { useContext, memo } from 'react';
import style from './style.module.scss';
import Box from './Box';
import { ProductContext } from '../../context';


const Fish = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in Fish component cant undefined !");
    }
    const {
        products
    } = productContext;

    const list_product = products.map((data) => {
        return  <div key={data.id}><Box data={data} /></div>
    })

    return (
        <div className={style.parent} >
            { list_product }
        </div>
    )
}

export default memo(Fish);