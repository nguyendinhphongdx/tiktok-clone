//Thư viện externor trước(thư viện bên ngoài)
import { useEffect } from 'react';
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong)
import styles from './Upload.module.scss';
import UploadMain from './UploadMain';

const cx = classNames.bind(styles);

function Upload() {
    useEffect(() => {
        document.title = 'Tải lên | TikTok';
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <UploadMain />
            </div>
        </div>
    );
}

export default Upload;
