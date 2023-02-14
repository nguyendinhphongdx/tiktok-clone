//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import CenterFooter from '~/components/CenterFooter';

//Thư viện internor sau(thư viện bên trong dự án)
import Header from '~/layouts/components/Header/Header';
import styles from "./HeaderOnly.module.scss"

const cx = classNames.bind(styles)

function HeaderOnly({ children }) {
    return (
        <div>
            <Header className={cx('header-v2')}/>
            {children}
            <CenterFooter/>
        </div>
    );
}

export default HeaderOnly;
