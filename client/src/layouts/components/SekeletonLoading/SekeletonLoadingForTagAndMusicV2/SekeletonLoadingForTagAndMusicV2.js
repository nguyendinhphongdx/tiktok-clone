//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './SekeletonLoadingForTagAndMusicV2.module.scss';

const cx = classNames.bind(styles);

function SekeletonLoadingForTagAndMusicV2({ className }) {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('avatar', 'sekeleton', className)}></div>
                <div className={cx('content')}>
                    <div className={cx('nickname', 'sekeleton')}></div>
                    <div className={cx('name', 'sekeleton')}></div>
                </div>
            </div>
            <div className={cx('des', 'sekeleton')}></div>
        </>
    );
}

export default SekeletonLoadingForTagAndMusicV2;
