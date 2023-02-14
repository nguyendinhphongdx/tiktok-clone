import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Video from '~/components/Video';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './TagMainVideo.module.scss';

const cx = classNames.bind(styles);

function ItemVideo({ data, metadata, onClick, check }) {
    const [show, setShow] = useState(false);
    const video = useRef();

    const handleHide = () => {
        setShow(false);
        const nextURL = `http://localhost:3000/tag/${data.trendy.name}`;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };

        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
        onClick();
    };

    const test = (e) => {
        e.preventDefault();
        const nextURL = `http://localhost:3000/${data.author.nickname}/video/${data.id}`;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };

        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
        setShow(true);
    };

    const handlerVideoPlay = () => {
        video.current.play();
    };

    const handlerVideoPause = () => {
        video.current.pause();
    };

    return (
        <>
            {show && <Video data={data} onClick={handleHide} followUser={metadata} check={check} onClickRender={onClick}/>}
            <div className={cx('item-container')}>
                <div className={cx('item-video')}>
                    <div style={{ paddingTop: '132.653%' }}>
                        <div
                            className={cx('video-wrapper')}
                            onMouseMove={handlerVideoPlay}
                            onMouseOut={handlerVideoPause}
                        >
                            <Link to={`/${data.author.nickname}/video/${data.id}`} onClick={test}>
                                <canvas width="75.38461538461539" height="100" className={cx('video-canvas')}></canvas>
                                <div className={cx('player-container')}>
                                    <div className={cx('player-wrapper')}>
                                        <video
                                            ref={video}
                                            muted
                                            src={data.video}
                                            loading="lazy"
                                            className={cx('img-poster')}
                                            loop
                                        />
                                    </div>
                                    <div className={cx('player-footer')}>
                                        <Link to={`/${data.author.nickname}`} className={cx('footer-avatar')}>
                                            <span shape="circle" className={cx('span-avatar-container')}>
                                                <img
                                                    src={data.author.avatar}
                                                    alt={data.description}
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
                        to={`/`}
                        title={`${data.description} #${data.trendy.name}`}
                        className={cx('cap-line')}
                        onClick={test}
                    >
                        <div className={cx('desc-container')}>
                            <span className={cx('span-text')}>{data.description}</span>{' '}
                            {data.trendy && (
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
