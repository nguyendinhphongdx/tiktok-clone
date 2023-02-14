//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { configBaseURL } from '~/common/common';


//Thư viện internor sau(thư viện bên trong dự án)
import styles from './FormContent.module.scss';
import reportArr from './ItemReport';
import { ArrowBack, ArrowReport } from '~/components/Icons';
import { CloseModal } from '~/components/Icons';

const cx = classNames.bind(styles);

function FormContent({ onClick, data }) {
    const [history, setHistory] = useState([reportArr]);
    const [check, setCheck] = useState(true);

    const current = history[history.length - 1];

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
        setCheck(true)
    };

    return (
        <>
            <div className={cx('form-header')}>
                {history.length > 1 && (
                    <div className={cx('back-btn')} onClick={handleBack}>
                        <ArrowBack />
                    </div>
                )}
                <h4 className={cx('form-title')}>Báo cáo</h4>
                <div className={cx('close-btn')} onClick={onClick}>
                    <CloseModal className={cx('close-icon')} />
                </div>
            </div>
            <div className={cx('form-content')}>
                {check === false ? (
                    <div className={cx('sub-title')}>Chúng tôi không cho phép:</div>
                ) : (
                    <div className={cx('select-text')}>Vui lòng chọn tình huống</div>
                )}
                {check === true && (
                    <>
                        {current.map((item, index) => {
                            const children = !!item.children;
                            const content = !!item.content;
                            return (
                                <div key={index}>
                                    <label
                                        className={cx('label-radio')}
                                        key={index}
                                        onClick={() => {
                                            if (children) {
                                                setHistory((prev) => [...prev, item.children]);
                                                setCheck(true);
                                            } else if (content) {
                                                setHistory((prev) => [...prev, item.content]);
                                                setCheck(false);
                                            }
                                        }}
                                    >
                                        {check === true && (
                                            <>
                                                <div className={cx('reason-text')} key={index}>
                                                    {item.title}
                                                </div>
                                                <ArrowReport className={cx('arrow-report')} />
                                            </>
                                        )}
                                    </label>
                                </div>
                            );
                        })}
                    </>
                )}

                {check === false && (
                    <ul className={cx('reason-list')}>
                        {current.map((item, index) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                )}

                {check === false && <FormContentFooter data={data} onClick={onClick}/>}
            </div>
        </>
    );
}

function FormContentFooter({ data, onClick }) {
    const [show, setShow] = useState(false)
    const btn = useRef()
    let arr = []

    useEffect(() => {
        setTimeout(() => {
            if(show) {
                btn.current.classList.add(cx('disabled'))
            } else {
                btn.current.classList.remove(cx('disabled'))
            }
        },1)
    },[show])

    const handleSubmitRP = async(e) => {
        e.preventDefault();
        const itemContent = document.querySelectorAll('li')
        itemContent.forEach((item) => {
            arr.push(item.innerText)
        })
        
        const response = await axios.post(`${configBaseURL}/api/${localStorage.getItem('idUser')}/report/${data.id}`, {
            contentReport: arr
        })

        if(response) {
            setShow(true);
        }
    }

    return (
        <div className={cx('footer')}>
            {show? <span>Báo cáo thành công,chúng tôi sẽ xem xét nội dung của đối tượng báo cáo!</span>: null}
            <button onClick={handleSubmitRP} ref={btn}>Gửi</button>
        </div>
    );
}

export default FormContent;
