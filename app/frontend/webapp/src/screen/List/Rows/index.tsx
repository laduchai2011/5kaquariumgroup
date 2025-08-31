import { useContext } from 'react';
import style from './style.module.scss';
import Row from './Row';
import { FishCodeContext } from '../context';

const Rows = () => {
    const fishCodeContext = useContext(FishCodeContext)
    if (!fishCodeContext) {
        throw new Error("fishCodeContext in Rows component cant undefined !");
    }
    const {
        fishCodes
    } = fishCodeContext;

    const list_fishCode = fishCodes && fishCodes.map((data, index) => {
        return <Row key={data.id} isHeader={false} data={data} index={index} />
    })

    return (
        <div className={style.parent}>
            <Row isHeader={true} />
           { list_fishCode }
        </div>
    )
}

export default Rows;