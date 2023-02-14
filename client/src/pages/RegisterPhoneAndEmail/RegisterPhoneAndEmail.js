//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack, ArrowDown, PassIcon, PassIconShow } from '~/components/Icons';
import config from '~/config';
import { ArrDate, ArrMonth, ArrYear } from './ArrOptionsDate';
import { configBaseURL } from '~/common/common';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './RegisterPhoneAndEmail.module.scss';

const cx = classNames.bind(styles);

function RegisterPhoneAndEmail() {
    useEffect(() => {
        document.title = 'Đăng ký | TikTok';
    }, []);

    return (
        <>
            <RegisterContainer />
            <BackButton />
        </>
    );
}

function RegisterDate() {
    const [checkDownOptions, setCheckDownOptions] = useState(false);
    const [day, setDay] = useState('Ngày');
    const [month, setMonth] = useState('Tháng');
    const [year, setYear] = useState('Năm');

    const selectLabel = useRef();
    const options = useRef();

    const handleShowOptions = () => {
        setCheckDownOptions(!checkDownOptions);
        selectLabel.current.classList.toggle(cx('select-icon1'));
        options.current.classList.toggle(cx('options-wrapper1'));
    };

    const selectLabel1 = useRef();
    const options1 = useRef();

    const handleShowOptions1 = () => {
        setCheckDownOptions(!checkDownOptions);
        selectLabel1.current.classList.toggle(cx('select-icon1'));
        options1.current.classList.toggle(cx('options-wrapper1'));
    };

    const selectLabel2 = useRef();
    const options2 = useRef();

    const handleShowOptions2 = () => {
        setCheckDownOptions(!checkDownOptions);
        selectLabel2.current.classList.toggle(cx('select-icon1'));
        options2.current.classList.toggle(cx('options-wrapper1'));
    };

    return (
        <>
            <div className={cx('des')}>Ngày sinh của bạn là ngày nào?</div>
            <div className={cx('age-selector')}>
                <div className={cx('selector')}>
                    <div className={cx('select-label')} onClick={handleShowOptions} id="day">
                        {day < 10 ? '0' + day : day}
                        <div className={cx('select-icon')} ref={selectLabel}>
                            <ArrowDown className={cx('arrow-down')} />
                        </div>
                    </div>
                    <div className={cx('options-wrapper')} ref={options}>
                        {ArrDate.map((item, index) => {
                            return (
                                <div
                                    className={cx('option')}
                                    key={index}
                                    onClick={() => {
                                        setDay(item);
                                        handleShowOptions();
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('selector')}>
                    <div className={cx('select-label')} onClick={handleShowOptions1} id="month">
                        {month < 10 ? '0' + month : month}
                        <div className={cx('select-icon')} ref={selectLabel1}>
                            <ArrowDown className={cx('arrow-down')} />
                        </div>
                    </div>
                    <div className={cx('options-wrapper')} ref={options1}>
                        {ArrMonth.map((item, index) => {
                            return (
                                <div
                                    className={cx('option')}
                                    key={index}
                                    onClick={() => {
                                        setMonth(item);
                                        handleShowOptions1();
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('selector')}>
                    <div className={cx('select-label')} onClick={handleShowOptions2} id="year">
                        {year}
                        <div className={cx('select-icon')} ref={selectLabel2}>
                            <ArrowDown className={cx('arrow-down')} />
                        </div>
                    </div>
                    <div className={cx('options-wrapper')} ref={options2}>
                        {ArrYear.map((item, index) => {
                            return (
                                <div
                                    className={cx('option')}
                                    key={index}
                                    onClick={() => {
                                        setYear(item);
                                        handleShowOptions2();
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={cx('note')}>Ngày sinh của bạn sẽ không được hiển thị công khai.</div>
        </>
    );
}

function RegisterContainer() {
    return (
        <div className={cx('container')}>
            <form>
                <div className={cx('title')}>Đăng ký</div>
                <RegisterDate />
                <RegisterByEmail />
            </form>
            <div className={cx('modal-content-footer')}>
                <div>Bạn đã có tài khoản?</div>
                <Link to={config.routes.login}>
                    <span className={cx('link-text')}>Đăng nhập</span>
                </Link>
            </div>
        </div>
    );
}

function RegisterByEmail() {
    const [showPass, setShowPass] = useState(false);
    const [showPass1, setShowPass1] = useState(false);
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [showErrorPhone, setShowErrorPhone] = useState(false);
    const [showErrorPass, setShowErrorPass] = useState(false);
    const [showErrorCFPass, setShowErrorCFPass] = useState(false);
    const [textErrorEmail, setTextErrorEmail] = useState('');
    const [textErrorPhone, setTextErrorPhone] = useState('');
    const [textErrorPass, setTextErrorPass] = useState('');
    const [textErrorCFPass, setTextErrorCFPass] = useState('');
    const inputEmail = useRef();
    const inputPhone = useRef();
    const inputPass = useRef();
    const inputPass1 = useRef();
    const errorEmail = useRef();
    const errorPhone = useRef();
    const errorPass = useRef();
    const errorPass1 = useRef();
    const [changeColor, setChangeColor] = useState(true);

    const handleRemoveDis = () => {
        if (
            inputEmail.current.value !== '' &&
            inputPass.current.value !== '' &&
            inputPhone.current.value !== '' &&
            inputPass1.current.value !== ''
        ) {
            setChangeColor(false);
        } else {
            setChangeColor(true);
        }
    };

    const show = () => {
        setShowPass(!showPass);
        if (!showPass) {
            inputPass.current.type = 'text';
        } else {
            inputPass.current.type = 'password';
        }
    };

    const show1 = () => {
        setShowPass1(!showPass1);
        if (!showPass1) {
            inputPass1.current.type = 'text';
        } else {
            inputPass1.current.type = 'password';
        }
    };

    const handleBlurEmail = () => {
        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (inputEmail.current.value === '') {
            setShowErrorEmail(true);
            setTextErrorEmail('Email không được để trống!');
        } else if (!inputEmail.current.value.match(mailformat)) {
            setShowErrorEmail(true);
            setTextErrorEmail('Email sai định dạng!');
        } else {
            setShowErrorEmail(false);
            setShowErrorEmail('');
        }
    };

    const handleBlurPhone = () => {
        const phoneformat = /^[0-9]+$/;
        if (inputPhone.current.value === '') {
            setShowErrorPhone(true);
            setTextErrorPhone('Số điện thoại không được để trống!');
        } else if (!inputPhone.current.value.match(phoneformat)) {
            setShowErrorPhone(true);
            setTextErrorPhone('Số điện thoại sai định dạng!');
        } else if (inputPhone.current.value.length < 10) {
            setShowErrorPhone(true);
            setTextErrorPhone('Số điện thoại phải có tối thiểu 10 chữ số');
        } else {
            setShowErrorPhone(false);
            setShowErrorPhone('');
        }
    };

    const handleBlurPass = () => {
        var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (inputPass.current.value === '') {
            setShowErrorPass(true);
            setTextErrorPass('Mật khẩu không được để trống!');
        } else if (!inputPass.current.value.match(passformat)) {
            setShowErrorPass(true);
            setTextErrorPass('Mật khẩu phải có ít nhất 1 chữ số, 1 chữ cái thường, 1 chữ cái hoa và lớn hơn 8 ký tự!');
        } else {
            setShowErrorPass(false);
            setShowErrorPass('');
        }
    };

    const handleBlurCFPass = () => {
        if (inputPass1.current.value === '') {
            setShowErrorCFPass(true);
            setTextErrorCFPass('Nhập lại mật khẩu không được để trống!');
        } else if (inputPass1.current.value !== inputPass.current.value) {
            setShowErrorCFPass(true);
            setTextErrorCFPass('Mật khẩu không trùng khớp!');
        } else {
            setShowErrorCFPass(false);
            setShowErrorCFPass('');
        }
    };

    return (
        <>
            <div className={cx('des')}>Email</div>
            <div className={cx('div-container')}>
                <input
                    type="text"
                    placeholder="Email"
                    ref={inputEmail}
                    onBlur={handleBlurEmail}
                    onKeyUp={handleRemoveDis}
                />
            </div>
            <span style={{ color: 'red', fontSize: '14px' }} ref={errorEmail} >{showErrorEmail && textErrorEmail}</span>
            <div className={cx('div-container')}>
                <input
                    type="phone"
                    placeholder="Số điện thoại"
                    onBlur={handleBlurPhone}
                    ref={inputPhone}
                    onKeyUp={handleRemoveDis}
                />
            </div>
            <span style={{ color: 'red', fontSize: '14px' }} ref={errorPhone}>{showErrorPhone && textErrorPhone}</span>
            <div className={cx('div-container')}>
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    ref={inputPass}
                    onBlur={handleBlurPass}
                    onKeyUp={handleRemoveDis}
                />
                <div className={cx('icon-container')} onClick={show}>
                    <div className={cx('pass-icon')}>{showPass ? <PassIconShow /> : <PassIcon />}</div>
                </div>
            </div>
            <span style={{ color: 'red', fontSize: '14px' }} ref={errorPass}>{showErrorPass && textErrorPass}</span>
            <div className={cx('div-container')}>
                <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    ref={inputPass1}
                    onBlur={handleBlurCFPass}
                    onKeyUp={handleRemoveDis}
                />
                <div className={cx('icon-container')} onClick={show1}>
                    <div className={cx('pass-icon')}>{showPass1 ? <PassIconShow /> : <PassIcon />}</div>
                </div>
            </div>
            <span style={{ color: 'red', fontSize: '14px' }} ref={errorPass1}>{showErrorCFPass && textErrorCFPass}</span>
            <SubmitInfo
                email1={inputEmail}
                pass={inputPass}
                phone1={inputPhone}
                pass1={inputPass1}
                erroremail={errorEmail}
                errorphone={errorPhone}
                errorpass={errorPass}
                errorpass1={errorPass1}
                change={changeColor}
            />
        </>
    );
}

//Nút gửi thông tin đăng ký
function SubmitInfo({ email1, pass, phone1, change, pass1, erroremail, errorphone, errorpass, errorpass1 }) {
    const [notiRegisterSuccess, setNotiRegisterSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showError1, setShowError1] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const [showError3, setShowError3] = useState(false);

    const handleRegister = async (e) => {
        if (
            email1.current.value !== '' &&
            pass.current.value !== '' &&
            pass1.current.value !== '' &&
            phone1.current.value !== '' &&
            erroremail.current.innerText === '' &&
            errorphone.current.innerText === '' &&
            errorpass.current.innerText === '' &&
            errorpass1.current.innerText === '' 
        ) {
            try {
                e.preventDefault();
                //lấy value trên form
                const day = document.querySelector('#day');
                const month = document.querySelector('#month');
                const year = document.querySelector('#year');
                const email = email1.current.value;
                const password = pass.current.value;
                const phone = phone1.current.value;
                const birthday = `${day.innerText}/${month.innerText}/${year.innerText}`;
                const role = 'user';

                //gửi value từ form client đến server
                const respone = await axios.post(`${configBaseURL}/api/auth/register/phone-or-email`, {
                    email: email,
                    password: password,
                    phone: phone,
                    birthday: birthday,
                    role: role,
                });

                if (respone.status === 200) {
                    setNotiRegisterSuccess(true);
                    setShowError(false);
                    setShowError1(false);
                    setShowError2(false);
                    setShowError3(false);
                    email1.current.value = '';
                    phone1.current.value = '';
                    pass.current.value = '';
                    pass1.current.value = '';
                }
            } catch (error) {
                if (error.response.data === 'Email already exists!') {
                    setShowError(true);
                    setNotiRegisterSuccess(false);
                    setShowError1(false);
                    setShowError2(false);
                    setShowError3(false);
                } else if (error.response.data === 'Empty Birthday!') {
                    setShowError1(true);
                    setNotiRegisterSuccess(false);
                    setShowError(false);
                    setShowError2(false);
                    setShowError3(false);
                } else if (error.response.data === 'Underage!') {
                    setShowError2(true);
                    setNotiRegisterSuccess(false);
                    setShowError(false);
                    setShowError1(false);
                    setShowError3(false);
                } else if (error.response.data === 'Phone already exists!') {
                    setShowError3(true);
                    setNotiRegisterSuccess(false);
                    setShowError(false);
                    setShowError1(false);
                    setShowError2(false);
                }
            }
        } 
        else {
            e.preventDefault();
        }
    };

    return (
        <>
            {notiRegisterSuccess ? (
                <>
                    <span style={{ color: 'red', fontWeight: '600' }}>Đăng ký thành công!</span>
                </>
            ) : (
                <></>
            )}

            {showError ? (
                <span style={{ color: 'red', fontWeight: '600' }}>Email này đã được sử dụng,mời nhập email khác!</span>
            ) : (
                <></>
            )}

            {showError1 ? <span style={{ color: 'red', fontWeight: '600' }}>Ngày sinh k được để trống!</span> : <></>}
            {showError2 ? <span style={{ color: 'red', fontWeight: '600' }}>Chưa đủ 18 tuổi!</span> : <></>}
            {showError3 ? <span style={{ color: 'red', fontWeight: '600' }}>SĐT này đã được sử dụng,mời nhập sđt khác!</span> : <></>}

            <button className={cx('style-button')} onClick={handleRegister} disabled={change} id="submitBtn">
                Đăng ký
            </button>
        </>
    );
}

function BackButton() {
    const handleBackPage = () => {
        window.history.back();
    };

    return (
        <div className={cx('back-btn')} onClick={handleBackPage}>
            <ArrowBack />
            Quay lại
        </div>
    );
}

export default RegisterPhoneAndEmail;
