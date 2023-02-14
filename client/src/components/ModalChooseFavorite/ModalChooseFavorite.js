//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

//Thư viện internor sau(thư viện bên trong dự án)
import images from '~/assets/images';
import { configBaseURL } from '~/common/common';
import Item from './Item';
import styles from './ModalChooseFavorite.module.scss';

const cx = classNames.bind(styles);

const arrTag = ['Tin tức', 'Đồ ăn', 'Làm đẹp', 'Nổi bật', 'Đời sống', 'Động vật', 'Giới trẻ', 'Xu hướng', 'Khác'];

let arr = [];
function ModalChooseFavorite() {
    const [time, setTime] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [count, setCount] = useState(0);
    const [arrSubmit, setArrSubmit] = useState(arr);
    const btnSubmit = useRef();
    const pick = useRef();

    useEffect(() => {
        setTimeout(() => {
            setTime(true);
        }, 3000);
        if (time) {
            if (count === 3) {
                pick.current.style.color = 'black';
                btnSubmit.current.classList.remove(cx('disabled'));
            } else {
                btnSubmit.current.classList.add(cx('disabled'));
            }

            if (count > 3) {
                pick.current.style.color = 'red';
            }
        }
    }, [count, time]);

    const countPickAdd = () => {
        setCount((c) => c + 1);
    };

    const countPickSub = () => {
        setCount((c) => c - 1);
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append('favorites', arrSubmit);
        try {
            const response = await axios.post(
                `${configBaseURL}/api/users/${localStorage.getItem('idUser')}/update-favorites`,
                {
                    favorites: arrSubmit,
                },
            );
            if (response) {
                localStorage.setItem('isNewUser', false);
                setSubmit(true);
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        } catch (error) {}
    };

    return (
        <div className={cx('container')}>
            {time ? (
                <>
                    {submit ? (
                        <>
                            <div className={cx('ready')}>
                                Chúng tôi đang chuẩn bị những video mới nhất cho bạn,vui lòng chờ giây lát!
                            </div>

                            <div className={cx('loading-container')}>
                                <span className={cx('tiktok-loading')}></span>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className={cx('title')}>Chào mừng đến với TikTok</h1>
                            <h3 className={cx('des')}>
                                Nhằm cá nhân hóa sở thích và tăng trải nghiệm của người dùng, vui lòng chọn các nội dung
                                video mà bạn ưa thích!
                            </h3>
                            <div className={cx('wrapper')}>
                                <div className={cx('discovery-list')}>
                                    {arrTag.map((data, index) => {
                                        return (
                                            <Item
                                                key={index}
                                                name={data}
                                                onClickAdd={countPickAdd}
                                                onClickSub={countPickSub}
                                                setArrSubmit={setArrSubmit}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={cx('count-pick')} ref={pick}>
                                Đã chọn : <span>{count}</span> / 3
                            </div>
                            <button className={cx('submit-btn', 'disabled')} ref={btnSubmit} onClick={handleSubmit}>
                                Hoàn thành
                            </button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className={cx('img')}>
                        <img src={images.logo} alt="TikTok"></img>
                    </div>
                    <div className={cx('loading-container')}>
                        <span className={cx('tiktok-loading')}></span>
                    </div>
                </>
            )}
        </div>
    );
}

export default ModalChooseFavorite;
