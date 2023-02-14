//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './SeleketonLoadingForHome.module.scss'

const cx = classNames.bind(styles)

function SekeletonLoadingForList() {
    return (
        <div className={cx('container')}>
            <div style={{display: 'flex'}}>
                <div className={cx('avatar', 'sekeleton')}></div>
                <div className={cx('content')}>
                    <div className={cx('nickname', 'sekeleton')}></div>
                    <div className={cx('name', 'sekeleton')}></div>
                    <div className={cx('name', 'sekeleton')}></div>
                </div>
            </div>
                <div className={cx('video', 'sekeleton')}></div>
        </div>
    );
}

export default SekeletonLoadingForList;
