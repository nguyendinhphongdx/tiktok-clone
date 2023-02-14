//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Apple, Google, KakaoTalk, Line, ShareFaceBook, Twitter, Instagram } from '~/components/Icons';

//Thư viện internor sau(thư viên bên trong dự án)
import styles from '../Login.module.scss';

const cx = classNames.bind(styles);

const arrLoginItem = [
    {
        icon: <ShareFaceBook />,
        text: 'Tiếp tục với Facebook',
    },
    {
        icon: <Google />,
        text: 'Tiếp tục với Google',
    },
    {
        icon: <Twitter />,
        text: 'Tiếp tục với Twitter',
    },
    {
        icon: <Line />,
        text: 'Tiếp tục với LINE',
    },
    {
        icon: <KakaoTalk />,
        text: 'Tiếp tục với KakaoTalk',
    },
    {
        icon: <Apple />,
        text: 'Tiếp tục với Apple',
    },
    {
        icon: <Instagram />,
        text: 'Tiếp tục với Instagram',
    },
];

function LoginItemDiv({ className }) {
    const renderItem = arrLoginItem.map((item, index) => {
        return (
            <div key={index} className={className}>
                <div className={cx('icon-cotainer')}>{item.icon}</div>
                {item.text}
            </div>
        );
    });

    return (
        <>
            {renderItem}
        </>
    );
}

export default LoginItemDiv;
