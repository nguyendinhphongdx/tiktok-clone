//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './SekeletonLoadingForFollowing.module.scss';

const cx = classNames.bind(styles);

function SekeletonLoadingForFllowing({ className }) {
    return <div className={cx('container', 'sekeleton', className)}></div>;
}

export default SekeletonLoadingForFllowing;
