import classNames from 'classnames/bind';
import { Lock } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from '../Profile.module.scss';
import ProfileMainVideo from './ProfileMainVideo';

const cx = classNames.bind(styles);

function ProfileMain({ followUser }) {
    

    return (
        <div className={cx('profile-content-main')}>
            <div className={cx('video-tab')}>
                <p className={cx('video-post')}>
                    <span>Video</span>
                </p>
                <p className={cx('video-like')}>
                    <Lock/>
                    <span className={cx('span-liked')}>Đã thích</span>
                </p>
                <div className={cx('video-bottom-line')}></div>
            </div>
            <ProfileMainVideo followUser={followUser}/>
        </div>
    );
}

export default ProfileMain;
