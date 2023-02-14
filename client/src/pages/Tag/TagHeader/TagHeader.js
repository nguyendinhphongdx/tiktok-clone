//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
// import { useRef } from 'react';
// import Button from '~/components/Button';
import { MoreAction, ShareProfile } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './TagHeader.module.scss';
import MenuMoreActions from './MenuMoreActions';
import MenuShareProfile  from './MenuShareTag';
import { useState } from 'react';
import ModalReport from '~/components/ModalReport';

const cx = classNames.bind(styles);

function TagHeader({ data }) {
    const [show, setShow] = useState(false)

    const handlerShowModalReport = () => {
        setShow(true)
    }

    const handlerHideModalReport = () => {
        setShow(false)
    }

    return (
        <div className={cx('content-header')}>
            <div className={cx('info')}>
                <div className={cx('avatar-container')}>
                    <span shape="circle" className={cx('span-avatar-container')}>
                        <img
                            loading="lazy"
                            alt={data.name}
                            src={data.thumbnail}
                            className={cx('avatar-img')}
                        />
                    </span>
                </div>
                <div className={cx('title-container')}>
                    <h1 className={cx('title-profile')}>#{data.name}</h1>
                    <h2 className={cx('title-sub')} title='Lượt xem'>{data.watch_count} lượt xem</h2>
                </div>
            </div>
            <div className={cx('desc')}>
                <span>{data.description}</span>
            </div>
            <MenuShareProfile>
                <div className={cx('share-actions')}>
                    <ShareProfile/>
                </div>
            </MenuShareProfile>
            <MenuMoreActions onClick={handlerShowModalReport}>
                <div className={cx('more-actions')}>
                    <MoreAction />
                </div>
            </MenuMoreActions>
            {show && <ModalReport onClick={handlerHideModalReport}/>}
        </div>
    );
}

export default TagHeader;
