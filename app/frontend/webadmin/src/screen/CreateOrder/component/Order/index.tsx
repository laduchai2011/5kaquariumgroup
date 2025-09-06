import './style.css';
import { IoAdd } from "react-icons/io5";


const Order = () => {


    return (
        <div className="CreateOrder_Order">
           <h2>Tạo đơn</h2>
           <div className='CreateOrder_Order-main'>
                <IoAdd className='CreateOrder_Order-addIcon' size={30} color='blue' /> 
           </div>
        </div>
    );
};

export default Order;
