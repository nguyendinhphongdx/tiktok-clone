import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Video from '~/components/Video';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from '~/pages/Profile/Profile.module.scss';

const cx = classNames.bind(styles);

function ItemVideo({ data, followUser, check, onClick }) {
    const [show, setShow] = useState(false)
    const video = useRef()


    const handleHide = () => {
        setShow(false)
        const nextURL = `http://localhost:3000/${data.author.nickname}`;
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

    const handlerVideoPlay = () => {
        video.current.play()
    }

    const handlerVideoPause = () => {
        video.current.pause()
    }

    return (
        <>
            {show && <Video data={data} onClick={handleHide} followUser={followUser} check={check} onClickRender={onClick} />}
            <div className={cx('item-container')}>
                <div className={cx('item-video')}>
                    <div style={{ paddingTop: '132.653%' }}>
                        <div className={cx('video-wrapper')} onMouseMove={handlerVideoPlay} onMouseOut={handlerVideoPause}>
                            <Link to={`/${data.author.nickname}/video/${data.id}`} onClick={test}>
                                <canvas width="75.38461538461539" height="100" className={cx('video-canvas')}></canvas>
                                <div className={cx('player-container')}>
                                    <div className={cx('player-wrapper')}>
                                        <video
                                            muted
                                            ref={video}
                                            src={data.video}
                                            alt={data.description}
                                            loading="lazy"
                                            loop 
                                            className={cx('video')}
                                        />
                                    </div>
                                    <div className={cx('player-footer')}>
                                        <strong className={cx('video-count')}>{data.watch_count}</strong>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('item-card-desc')} title={`${data.description} #${data.trendy.name}`}>
                    {data.description}
                    {data.trendy && <Link to={`/${data.trendy.name}`}><strong>#{data.trendy.name}</strong></Link>}
                </div>
            </div>
        </>
    );
}

export default ItemVideo;
