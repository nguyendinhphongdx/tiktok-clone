import classNames from 'classnames/bind';

import styles from '~/pages/Profile/Profile.module.scss';

const cx = classNames.bind(styles);

function ItemMenuShareProfile({ icon, text, onclick, onClickShowToast }) {
    const handleCoppyURL = async () => {
        const URL = window.location.href;
        navigator.clipboard.writeText(URL);
        onClickShowToast()
    };
    return (
        <div onClick={onclick} className={cx('share-link')}>
            {icon}
            {text === 'Sao chép liên kết' ? (
                <span className={cx('share-text')} onClick={handleCoppyURL}>
                    {text}
                </span>
            ) : (
                <span className={cx('share-text')}>{text}</span>
            )}
        </div>
    );
}

export default ItemMenuShareProfile;
