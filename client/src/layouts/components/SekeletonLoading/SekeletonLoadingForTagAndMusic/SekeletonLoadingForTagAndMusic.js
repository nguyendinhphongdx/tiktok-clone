//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './SekeletonLoadingForTagAndMusic.module.scss';

const cx = classNames.bind(styles);

function SekeletonLoadingForTagAndMusic() {
    return (
        <div className={cx('container')}>
            <div className={cx('tag', 'sekeleton')}></div>
            <div className={cx('tag', 'sekeleton')}></div>
        </div>
    );
}

export default SekeletonLoadingForTagAndMusic;
