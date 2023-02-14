import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import classNames from 'classnames/bind';

//
import {
    Emble,
    ShareCoppy,
    ShareFaceBook,
    ShareFriend,
    ShareWhatsApp,
    ArrowShare,
    Twitter,
    LinkIn,
    Telegram,
    Email,
    Line,
    Pinterest,
} from '~/components/Icons';
import ItemMenuShareProfile  from './ItemMenuShareProfile';
import styles from '~/pages/Profile/Profile.module.scss';
// import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function MenuShareProfile({ children, onClickShowToast }) {
    const shareArr = [
        {
            icon: <Emble />,
            text: 'Nhúng',
        },
        {
            icon: <ShareFriend />,
            text: 'Gửi đến bạn bè',
        },
        {
            icon: <ShareFaceBook />,
            text: 'Chia sẻ với Facebook',
        },
        {
            icon: <ShareWhatsApp />,
            text: 'Chia sẻ với WhatsApp',
        },
        {
            icon: <ShareCoppy />,
            text: 'Sao chép liên kết',
        },
        {
            icon: <ArrowShare />,
            text: '',
            isConcat: [],
        },
    ];
    
    const arrayShare1 = [
        {
            icon: <Twitter />,
            text: 'Chia sẻ với Twitter',
        },
        {
            icon: <LinkIn />,
            text: 'Chia sẻ với LinkedIn',
        },
        {
            icon: <Telegram />,
            text: 'Chia sẻ với Telegram',
        },
        {
            icon: <Email />,
            text: 'Chia sẻ với Mail',
        },
        {
            icon: <Line />,
            text: 'Chia sẻ với Line',
        },
        {
            icon: <Pinterest />,
            text: 'Chia sẻ với Pinterest',
        },
        {
            icon: '',
            text: '',
        },
    ];


    const [arrayShare, setArrayShare] = useState(shareArr);

    const concatArrShare = () => {
        return arrayShare.map((item, index) => {
            const isParent = !!item.isConcat;

            return (
                <ItemMenuShareProfile
                    onClickShowToast={onClickShowToast}
                    key={index}
                    text={item.text}
                    icon={item.icon}
                    className={cx('share-text')}
                    onclick={() => {
                        if (isParent) {
                            setArrayShare(arrayShare.slice(0, 5).concat(arrayShare1));
                        } else {
                        }
                    }}
                />
            );
        });
    };

    const renderListShare = (attrs) => {
        return (
            <div className={cx('menu-list-share')} tabIndex="-1" {...attrs}>
                {concatArrShare()}
            </div>
        );
    };

    const resetShareMenu = () => setArrayShare(shareArr);

    return (
        <>
            <Tippy
                interactive
                render={renderListShare}
                offset={[-104, 4]}
                delay={[0, 500]}
                onHide={resetShareMenu}
            >
                {children}
            </Tippy>
        </>
    );
}

export default MenuShareProfile;
