//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { LikeVideo, NextVideo, PrevVideo, SoundVideo } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './KeyboardShortcutItem.module.scss';

const cx = classNames.bind(styles);

const keyboardArr = [
    {
        text: 'Quay về video trước',
        icon: <PrevVideo />,
    },
    {
        text: 'Đến video tiếp theo',
        icon: <NextVideo />,
    },
    {
        text: 'Thích video',
        icon: <LikeVideo />,
    },
    {
        text: 'Tắt tiếng / bật tiếng video',
        icon: <SoundVideo />,
    },
];

function KeyboardShortcutItem() {
    return (
        <>
            {keyboardArr.map((item, index) => {
                return <div className={cx('container')} key={index}>
                    {item.text}
                    {item.icon}
                </div>;
            })}
        </>
    );
}

export default KeyboardShortcutItem;
