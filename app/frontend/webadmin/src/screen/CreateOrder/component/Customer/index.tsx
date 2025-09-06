import './style.css';


const Customer = () => {


    return (
        <div className="CreateOrder_Customer">
            <h2>Thông tin khách hàng</h2>
            <div className='CreateOrder_Customer-inputContainer'>
                <div>Tài khoản :</div>
                <div><input placeholder='Nhập tên tài khoản tại đây' /></div>
            </div>
            <div className='CreateOrder_Customer-avatarContainer'>
                <img src='https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg' alt='' />
                <div>
                    <div>Lã Hải</div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
