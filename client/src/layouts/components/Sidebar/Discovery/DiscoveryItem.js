//Thư viện externor trước(thư viện bên ngoài)
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//Thư viện internor sau(thư viên bên trong dự án)
import styles from './Discovery.module.scss';
import { Tag, Music } from '../../../../components/Icons';


const cx = classNames.bind(styles);

function DiscoveryItem({ name, check, idMusic}) {
    return (
        <Link
        className={cx('discovery-item')} 
        to={check === undefined ? `/tag/${name}` : `/music/${name}-${idMusic}`} 
        >
            <div className={cx('discovery-item-container')}>
                {check === undefined ? <Tag/> : <Music/>}
                <p className={cx('discovery-item-text')}>{name}</p>     
            </div>
        </Link>
    );
}

// DiscoveryItem.propTypes = {};

export default DiscoveryItem;
