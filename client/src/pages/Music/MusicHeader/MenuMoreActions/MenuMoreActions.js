//Thư viện externor trước(thư viện bên ngoài)
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { ProfileBlock, ProfileReport } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './MenuMoreActions.module.scss';
const cx = classNames.bind(styles);

function MenuMoreActions({ children }) {
    const moreActionArr = [
        {
            icon: <ProfileReport />,
            text: 'Báo cáo',
        },
        {
            icon: <ProfileBlock />,
            text: 'Chặn',
        },
    ];

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
                        <div className={cx('action-item')}>
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
            <Tippy interactive render={renderMoreAction} delay={[0, 500]} offset={[-78, 10]} zIndex="10000">
                {children}
            </Tippy>
        </>
    );
}

export default MenuMoreActions;
