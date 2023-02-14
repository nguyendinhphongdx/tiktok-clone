//Thư viện externor trước(thư viện bên ngoài)
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import classNames from 'classnames/bind';
import { configBaseURL } from '~/common/common';
import { ProfileBlock, ProfileReport } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from '~/pages/Profile/Profile.module.scss';
const cx = classNames.bind(styles);

function MenuMoreActions({ children, data, onClick, onClickRenderComment, metadata }) {
    const moreActionArr = [
        {
            icon: <ProfileBlock />,
            text: 'Xóa',
        },
    ];

    const moreActionArrV2 = [
        {
            icon: <ProfileReport />,
            text: 'Báo cáo',
        },
    ];

    const handelDeleteComment = async () => {
        if(localStorage.getItem('accessToken')) {
            try {
                await axios.post(`${configBaseURL}/api/comment/delete/${metadata.id}/${data.id}`)
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                onClick()
                onClickRenderComment()
            }, 500)
        }
    }

    const arr = () => {
        let arr1;
        if(data.author.nickname === localStorage.getItem('nickName')) {
            arr1 = moreActionArr
        } else {
            arr1 = moreActionArrV2
        }
        return arr1
    }

    const moreAction = () => {
        return arr().map((item, index) => {
            return (
                <div key={index} className={cx('action-container')}>
                    {item.text === 'Báo cáo' ? (
                        <div className={cx('action-item')}>
                            {item.icon}
                            <p className={cx('action-text')}>{item.text}</p>
                        </div>
                    ) : (
                        <div className={cx('action-item')} onClick={handelDeleteComment}>
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
            <Tippy interactive render={renderMoreAction} placement="bottom" delay={[0, 500]} offset={[-74, 0]}  zIndex="10000">
                {children}
            </Tippy>
        </>
    );
}

export default MenuMoreActions;
