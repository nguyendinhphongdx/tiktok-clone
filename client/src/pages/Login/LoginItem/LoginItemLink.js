//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { QRCode, User } from '~/components/Icons';
import config from '~/config';

//Thư viện internor sau(thư viên bên trong dự án)
import styles from '../Login.module.scss'


const cx = classNames.bind(styles);

const arrLoginItem = [
    {
        icon: <QRCode/>,
        text: 'Sử dụng mã QR',
        to: ''
    },
    {
        icon: <User/>,
        text: 'Số điện thoại / Email',
        to: config.routes.loginPhoneAndEmail
    },
]

function LoginItemLink({ className }) {
    const renderItem = arrLoginItem.map((item, index) => {
        return (
            <Link key={index} className={className} to={item.to}>
                <div className={cx('box-container')}>
                    <div className={cx('icon-cotainer')}>{item.icon}</div>
                    {item.text}
                </div>
            </Link>
        );
    });

    return (
        <>
            {renderItem}
        </>
    );
}

export default LoginItemLink;