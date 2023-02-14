//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
// import { useRef } from 'react';
// import Button from '~/components/Button';
import { MoreAction, MusicPause, MusicPlay, ShareProfile } from '~/components/Icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './MusicHeader.module.scss';
import MenuMoreActions from './MenuMoreActions';
import MenuShareProfile from './MenuShareTag';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function MusicHeader({ data }) {
    const music = useRef();
    const [play, setPlay] = useState(false);

    const playMusic = () => {
        music.current.play();
        setPlay(true)
    };

    const pauseMusic = () => {
        music.current.pause();
        setPlay(false)
    }

    const checkEnd = () => {
        setPlay(false);
    }

    return (
        <div className={cx('content-header')}>
            <div className={cx('info')}>
                <div className={cx('avatar-container')}>
                    <span shape="circle" className={cx('span-avatar-container')}>
                        <img loading="lazy" alt="" src={data.thumbnail} className={cx('avatar-img')} />
                    </span>
                    <div className={cx('player')}>
                        <audio ref={music} onEnded={checkEnd}>
                            <source src={data.music} type="audio/mpeg" />
                        </audio>
                    </div>
                    {play ? (
                        <div className={cx('player-icon')} onClick={pauseMusic}>
                            <MusicPlay />
                        </div>
                    ) : (
                        <div className={cx('player-icon')} onClick={playMusic}>
                            <MusicPause />
                        </div>
                    )}
                </div>
                <div className={cx('title-container')}>
                    <h1 className={cx('title-profile')}>{data.name}</h1>
                    <h2 className={cx('singer')}>{data.singer}</h2>
                    <h2 className={cx('title-sub')} title="Lượt xem">
                        {data.watch_count} lượt xem
                    </h2>
                </div>
            </div>
            <MenuShareProfile>
                <div className={cx('share-actions')}>
                    <ShareProfile />
                </div>
            </MenuShareProfile>
            <MenuMoreActions>
                <div className={cx('more-actions')}>
                    <MoreAction />
                </div>
            </MenuMoreActions>
        </div>
    );
}

export default MusicHeader;
