//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';

//Thư viện internor sau(thư viện bên trong dự án)
import { configBaseURL, configHeader } from '~/common/common';
import styles from './Tag.module.scss';
import TagHeader from './TagHeader';
import TagMain from './TagMain';
import { useParams } from 'react-router-dom';
import SekeletonLoadingForTagAndMusicV2 from '~/layouts/components/SekeletonLoading/SekeletonLoadingForTagAndMusicV2/SekeletonLoadingForTagAndMusicV2';

const cx = classNames.bind(styles);

function Tag() {
    const [trendy, setTrendy] = useState([]);
    const [followingAccounts, setFollowingAccount] = useState([]);
    const [time, setTime] = useState(false);
    const { name } = useParams();

    useEffect(() => {
        setTime(false)
        try {
            //get list âm nhạc
            axios
                .get(`${configBaseURL}/api/trendy/${name}`)
                .then((result) => {
                    setTrendy(result);
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
    }, [name]);

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

    useEffect(() => {
        document.title = `#${name} Gắn hastag cho các video trên TikTok`;
    });

    const renderData = () => {
        try {
            axios
                .get(`${configBaseURL}/api/trendy/${name}`)
                .then((result) => {
                    setTrendy(result);
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
                            {trendy.data.map((item, index) => {
                                return <TagHeader data={item} key={index}/>;
                            })}
                        </>
                    ) : (
                        <SekeletonLoadingForTagAndMusicV2/>
                    )}
                    <TagMain data={followingAccounts} onClick={renderData}/>
                </div>
            </div>
        </>
    );
}

export default Tag;
