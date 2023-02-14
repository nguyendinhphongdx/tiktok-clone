//
import classNames from "classnames/bind";
import styles from './LoginSidebar.module.scss'

//
import Button from "~/components/Button";
import config from "~/config";

const cx = classNames.bind(styles)

function LoginSideBar({ onClick }) {
    return ( 
        <>
            <div className={cx('wrapper')}>
                <p className={cx('label')}>Đăng nhập để follow các tác giả, thích video và xem bình luận.</p>
                <Button primary href={config.routes.login} className={cx('btn-sidebar-login')} onClick={onClick}>Đăng nhập</Button>
            </div>
        </>
     );
}

export default LoginSideBar;