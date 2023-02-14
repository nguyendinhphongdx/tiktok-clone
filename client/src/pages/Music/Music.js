//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Music.module.scss';
import MusicHeader from './MusicHeader';
import MusicMain from './MusicMain';
import { configBaseURL, configHeader } from '~/common/common';
import SekeletonLoadingForTagAndMusicV2 from '~/layouts/components/SekeletonLoading/SekeletonLoadingForTagAndMusicV2/SekeletonLoadingForTagAndMusicV2';


const cx = classNames.bind(styles);

function Music() {
    const [music, setMusic] = useState([]);
    const [followingAccounts, setFollowingAccount] = useState([]);
    const [time, setTime] = useState(false);
    const { name } = useParams();
    const { id } = useParams();

    useEffect(() => {
        setTime(false)
        try {
            //get âm nhạc
            axios
                .get(`${configBaseURL}/api/music/${name}-${id}`)
                .then((result) => {
                    setMusic(result);
                    if (result) {
                        setTimeout(() => {
                            setTime(true);
                        }, 500);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, [name, id]);

    useEffect(() => {
        document.title = `${name} | Bài hát phổ biến trên TikTok`;
    });

    //lấy người dùng follow của người dùng đang đăng nhập
    useEffect(() => {
        try {
            //
            axios
                .get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
                .then((result) => {
                    setFollowingAccount(result.data[0].fllowing);
                })
                .catch((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.log(error);
            }
        }, []);

        const renderData = () => {
            try {
                //get âm nhạc
                axios
                    .get(`${configBaseURL}/api/music/${name}-${id}`)
                    .then((result) => {
                        setMusic(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }

    return (
        <>
            <div className={cx('layout')}>
                <div className={cx('content')}>
                {time ? (
                        <>
                            {music.data.map((item, index) => {
                                return <MusicHeader data={item} key={index} />;
                            })}
                        </>
                    ) : (
                        <SekeletonLoadingForTagAndMusicV2/>
                    )}
                    <MusicMain data={followingAccounts} onClick={renderData}/>
                </div>
            </div>
        </>
    );
}

export default Music;
