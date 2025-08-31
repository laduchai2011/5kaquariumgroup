import { useEffect } from 'react';
import './style.css';
import Header from '../Header';
import OverView from './component/OverView';
import MyChart from './component/MyChart';
import SalerRank from './component/SalerRank';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // const myId = sessionStorage.getItem("myId");
        const appRole = sessionStorage.getItem("appRole");
        // if (myId === null) {
        //     navigate('/signin')
        // }
        if (appRole !== 'admin') {
            navigate('/notadmin')
        }
    }, [navigate])

    return (
        <div className="Home">
            <div>
                <Header />
            </div>
            <div className='Home-main'>
                <div className='Home-main1'>
                    <OverView />
                    <MyChart />
                    <SalerRank />
                </div>
            </div>
        </div>
    );
};

export default Home;
