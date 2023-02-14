//Thư viện externor trước(thư viện bên ngoài)
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import classNames from 'classnames/bind';
import { configBaseURL } from '~/common/common';
import { ProfileBlock } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from '~/pages/Profile/Profile.module.scss';
const cx = classNames.bind(styles);

function MenuMoreActions({ children, data, onClick, onClickShowToast }) {
    const moreActionArr = [
        {
            icon: <ProfileBlock />,
            text: 'Xóa',
        },
    ];

    const handelDeleteVideo = async () => {
        try {
            await axios.delete(`${configBaseURL}/api/video/delete/${data.id}`)
        } catch (error) {
            console.log(error);
        }
        onClickShowToast()
        setTimeout(() => {
            onClick()
        }, 5000)
    }

    const moreAction = () => {
        return moreActionArr.map((item, index) => {
            return (
                <div key={index} className={cx('action-container')}>
                    {item.text === 'Báo cáo' ? (
                        <div className={cx('action-item1')}>
                            {item.icon}
                            <p className={cx('action-text')}>{item.text}</p>
                        </div>
                    ) : (
                        <div className={cx('action-item')} onClick={handelDeleteVideo}>
                            {item.icon}
                            <p className={cx('action-text')}>{item.text}</p>
                        </div>
                    )}
                </div>
            );
        });
    };

    const renderMoreAction = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs} className={cx('action-container-big')}>
                <div className={cx('report-container')}>{moreAction()}</div>
            </div>
        );
    };

    return (
        <>
            <Tippy interactive render={renderMoreAction} delay={[0, 500]} offset={[-74, 0]} zIndex="10000">
                {children}
            </Tippy>
        </>
    );
}

export default MenuMoreActions;
