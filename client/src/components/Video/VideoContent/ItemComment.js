//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { configBaseURL } from '~/common/common';
import { HeartComment, LikeComment, MoreAction } from '~/components/Icons';
import MenuMoreActionsComment from './MenuMoreActionsComment';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function ItemComment({ data, onClick, onClickRenderComment, metadata }) {
    const [change, setChange] = useState(false);
    const [check, setCheck] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            try {
                axios.get(`${configBaseURL}/api/comment/${localStorage.getItem('nickName')}`)
                .then((result) => {
                    if(result) {
                        setCheck(result.data[0].likedComment)
                    }
                }).catch((err) => {
                    console.log(err);                
                });
            } catch (error) {
                
            }
        }
    },[])

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            check.forEach((item, index) => {
                if(item === data._id) {
                    setChange(true)
                }
            })
        }
    },[check, data._id]);

    const handleLikeComment = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.post(
                    `${configBaseURL}/api/comment/${localStorage.getItem('nickName')}/like/${data.id}`,
                );
            } catch (error) {
                console.log(error);
            }
            setChange(true)
            onClickRenderComment();
        }
    };

    const handleUnLikeComment = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.post(
                    `${configBaseURL}/api/comment/${localStorage.getItem('nickName')}/unlike/${data.id}`,
                );
            } catch (error) {
                console.log(error);
            }
            setChange(false)
            onClickRenderComment();
        }
    };


    return (
        <div className={cx('comment-item-container')}>
            <div className={cx('comment-content-container')}>
                <Link to={`/${data.author.nickname}`} className={cx('style-userlink-avatar')}>
                    <span className={cx('avatar-span')}>
                        <img src={data.author.avatar} alt="avatar" loading="lazy" />
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
                        <MenuMoreActionsComment
                            data={data}
                            onClickRenderComment={onClickRenderComment}
                            onClick={onClick}
                            metadata={metadata}
                        >
                            <div>
                                <MoreAction className={cx('more-icon')} />
                            </div>
                        </MenuMoreActionsComment>
                    </div>
                    <div className={cx('like-wrapper')}>
                        {change ? (
                            <div onClick={handleUnLikeComment}>
                                <HeartComment />
                            </div>
                        ) : (
                            <div onClick={handleLikeComment}>
                                <LikeComment />
                            </div>
                        )}
                        <span>{data.heart_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemComment;
