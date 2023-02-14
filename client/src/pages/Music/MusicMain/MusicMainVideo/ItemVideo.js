import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Video from '~/components/Video';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './MusicMainVideo.module.scss';

const cx = classNames.bind(styles);

function ItemVideo({ data, metadata, onClick, check }) {
    const [show, setShow] = useState(false)

    const handleHide = () => {
        setShow(false)
        const nextURL = `http://localhost:3000/music/${data.music.name}`;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        
        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
        onClick()
    }

    const test = (e) => {
        e.preventDefault();
        const nextURL = `http://localhost:3000/${data.author.nickname}/video/${data.id}`;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        
        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
        setShow(true)
    }

    return (
        <>
            {show && <Video data={data} onClick={handleHide} followUser={metadata} check={check} onClickRender={onClick}/>}
            <div className={cx('item-container')}>
                <div className={cx('item-video')}>
                    <div style={{ paddingTop: '132.653%' }}>
                        <div className={cx('video-wrapper')}>
                            <Link to={`/${data.author.nickname}/video/${data.id}`} onClick={test}>
                                <canvas width="75.38461538461539" height="100" className={cx('video-canvas')}></canvas>
                                <div className={cx('player-container')}>
                                    <div className={cx('player-wrapper')}>
                                        <video
                                            muted
                                            src={data.video}
                                            alt={data.description}
                                            loading="lazy"
                                            className={cx('img-poster')}
                                        />
                                    </div>
                                    <div className={cx('player-footer')}>
                                        <Link to={`/${data.author.nickname}`} className={cx('footer-avatar')}>
                                            <span shape="circle" className={cx('span-avatar-container')}>
                                                <img
                                                    src={data.author.avatar}
                                                    alt={data.author.nickname}
                                                    loading="lazy"
                                                    className={cx('img-avatar')}
                                                />
                                            </span>
                                        </Link>
                                        <Link to={`/${data.author.nickname}`} className={cx('footer-text')}>
                                            <div className={cx('user-title')}>
                                                <h4 className={cx('user-name')}>{data.author.nickname}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('item-card-desc')}>
                    <Link
                        to={'/'}
                        title={`${data.description} #${data.trendy.name}`}
                        className={cx('cap-line')}
                        onClick={test}
                    >
                        <div className={cx('desc-container')}>
                            <span className={cx('span-text')}>{data.description}</span> {data.trendy && (
                                <Link to={`/${data.trendy.name}`}>
                                    <strong>#{data.trendy.name}</strong>
                                </Link>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ItemVideo;
