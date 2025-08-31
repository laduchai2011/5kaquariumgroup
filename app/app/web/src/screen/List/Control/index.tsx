import { useContext } from 'react';
import style from './style.module.scss';
import { GrFormNext, GrFormPrevious  } from "react-icons/gr";
import { FishCodeContext } from '../context';


const Control = () => {
    const fishCodeContext = useContext(FishCodeContext)
    if (!fishCodeContext) {
        throw new Error("fishCodeContext in Control component cant undefined !");
    }
    const {
        totalCount,
        page,
        setPage
    } = fishCodeContext;

    const handleNextPage = () => {
        setPage(pre => {
            const page_ = Number(pre);
            if (page_ < handlePageNumber()) {
                return (page_ + 1).toString()
            }
            return pre;  
        })
    }

    const handleBackPage = () => {
        setPage(pre => {
            const page_ = Number(pre);
            if (page_ > 1) {
                return (page_ - 1).toString()
            }
            return pre;  
        })
    }

    const handlePageNumber = () => {
        if (totalCount) {
            const kqn = Math.floor(totalCount / 10);
            const kqd = totalCount % 10;
            let pageNumber = 0;
            if (kqd > 0) {
                pageNumber = kqn + 1;
            } else {
                pageNumber = kqn;
            }
            return pageNumber;
        }
        return 10;
    }

    return (
        <div className={style.parent}>
           <div>{`${page} / ${handlePageNumber()}`}</div>
           <div className={style.iconContainer}>
                <GrFormPrevious onClick={() => handleBackPage()} size={20} />
                <GrFormNext onClick={() => handleNextPage()} size={20} />
           </div>
        </div>
    )
}

export default Control;