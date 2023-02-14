//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { LikeComment, MoreAction } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function ItemComment({ data }) {
    return (
        <div className={cx('comment-item-container')}>
            <div className={cx('comment-content-container')}>
                <Link to={`/${data.author.nickname}`} className={cx('style-userlink-avatar')}>
                    <span className={cx('avatar-span')}>
                        <img
                            src={data.author.avatar}
                            alt="avatar"
                            loading="lazy"
                        />
                    </span>
                </Link>
                <div className={cx('content-cm-container')}>
                    <Link to={`/${data.author.nickname}`} className={cx('user-link-name')}>
                        <span className={cx('user-name-text')}>{data.author.nickname}</span>
                    </Link>
                    <div className={cx('comment-text')}>{data.content}</div>
                    <div className={cx('comment-sub-content')}>
                        <span className={cx('comment-time')}>{data.created_at.slice(5, 10)}</span>
                    </div>
                </div>
                <div className={cx('action-container')}>
                    <div className={cx('more-container')}>
                        <div><MoreAction className={cx('more-icon')}/></div>
                    </div>
                    <div className={cx('like-wrapper')}>
                        <div><LikeComment/></div>
                        <span>{data.heart_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemComment;
