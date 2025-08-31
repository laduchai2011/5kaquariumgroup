import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import { ABOUT5K } from '@src/const/text';
import { FaAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const About5k = () => {
    return (
        <div className={style.parent}>
            <div className={style.headerLeft}><HeaderLeft header={ABOUT5K} /></div>
            <div className={style.headerTop}><HeaderTop header={ABOUT5K} /></div>
            <div className={style.main}>
                <div>
                    <div><h3>5K AQUARIUM</h3></div>
                    <div>
                        <div>
                            <FaAddressBook size={20} />
                            <div>Địa chỉ</div>
                            <div>Liền kề 304, N09-Khu cổng đồng, đường Nguyễn Thanh Bình, La Khê, Hà Đông, Hà Nội (Tìm theo google-map, từ khóa: 5KAQUARIUM, cơ sở Nguyễn Thanh Bình).</div>
                        </div>
                        <div>
                            <FaPhone size={20} color='red' />
                            <div>Liên hệ</div>
                            <div>0377656907</div>
                        </div>
                        <div>
                            <FaFacebook size={20} color='blue' />
                            <div>Facebook</div>
                            <a href="https://www.facebook.com/profile.php?id=61551000583852" target="_blank" rel="noopener noreferrer">
                                Đi tới fanpage
                            </a>
                        </div>
                        <div>
                            <FaTiktok size={20} />
                            <div>Tiktok</div>
                            <a href="https://www.tiktok.com/@5kaquarium1?lang=vi-VN" target="_blank" rel="noopener noreferrer">
                                Đi tới tiktok
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About5k;