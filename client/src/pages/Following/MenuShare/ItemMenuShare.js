import axios from 'axios';
import classNames from 'classnames/bind';
import { configBaseURL } from '~/common/common';

import styles from './MenuShare.module.scss';

const cx = classNames.bind(styles);

function ItemMenuShare({ icon, text, onclick, data, onClickRender, onClickShowToast }) {
    const handleCoppyURL = async () => {
        const URL = `http://localhost:3000/${data.author.nickname}/video/${data.id}`
        navigator.clipboard.writeText(URL);
        try {
            await axios.post(`${configBaseURL}/api/video/increase-share/${data.id}`)
        } catch (error) {
            
        }
        onClickShowToast()
        onClickRender()
    };

    return (
        <div onClick={onclick} className={cx('share-link')}>
            {icon}
            {text === 'Sao chép liên kết' ? (
                <span className={cx('share-text')} onClick={handleCoppyURL}>{text}</span>
            ) : (
                <span className={cx('share-text')}>{text}</span>
            )}
        </div>
    );
}

export default ItemMenuShare;
