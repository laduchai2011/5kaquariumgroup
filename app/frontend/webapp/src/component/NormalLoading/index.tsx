import style from './style.module.scss';

const NormalLoading = () => {
    return (
        <div className={style.parent}>
            <div className={style.ring} />
            <span>Loading ......</span>
        </div>
    );
};

export default NormalLoading;
