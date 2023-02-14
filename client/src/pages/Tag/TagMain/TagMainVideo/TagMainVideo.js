import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './TagMainVideo.module.scss';
import ItemVideo from './ItemVideo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { configBaseURL, configHeader } from '~/common/common';
import { useParams } from 'react-router-dom';
import SekeletonLoadingForVideo from '~/layouts/components/SekeletonLoading/SekeletonForVideo/SekeletonLoadingForVideo';

const cx = classNames.bind(styles);

function TagMainVideo({ metadata, onClick }) {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState([]);
    const [show, setShow] = useState(false);
    const { name } = useParams();

    useEffect(() => {
        setShow(false)
        try {
            axios
                .get(`${configBaseURL}/api/video/get-list-video-trendy/${name}`)
                .then((result) => {
                    setData(result.data);
                    if (result) {
                        setTimeout(() => {
                            setShow(true);
                        }, 1000);
                    }
                })
                .catch((err) => {});
        } catch (error) {}
    }, [name]);

    useEffect(() => {
        try {
            axios
                .get(`${configBaseURL}/api/users/get-liked-video`, configHeader)
                .then((result) => {
                    if(result) {
                        setCheck(result.data)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    },[]);

    return (
        <div className={cx('grid-video-container')}>
            {data.length > 0 ? (
                <div className={cx('grid-video-list')}>
                    {show ? (
                        <>
                            {data.map((item, index) => {
                                return <ItemVideo data={item} key={index} metadata={metadata} check={check} onClick={onClick}/>;
                            })}
                        </>
                    ) : (
                        <>
                            {data.map(() => {
                                return <SekeletonLoadingForVideo />;
                            })}
                        </>
                    )}
                </div>
            ) : (
                <div className={cx('not-video')}>Chưa có video nào</div>
            )}
        </div>
    );
}

export default TagMainVideo;
