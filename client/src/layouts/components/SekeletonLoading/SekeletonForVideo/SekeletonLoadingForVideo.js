//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './SekeletonLoadingForVideo.module.scss';

const cx = classNames.bind(styles);

function SekeletonLoadingForVideo() {
    return (
        <div className={cx('container', 'sekeleton')}>
        </div>
    );
}

export default SekeletonLoadingForVideo;
