//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import jwt_decode from 'jwt-decode';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack, PassIcon, PassIconShow } from '~/components/Icons';
import config from '~/config';
import axios from 'axios';
import { configBaseURL } from '~/common/common'


//Thư viện internor sau(thư viện bên trong dự án)
import styles from './LoginPhoneAndEmail.module.scss';

const cx = classNames.bind(styles);

function LoginPhoneAndEmail() {
    useEffect(() => {
        document.title = 'Đăng nhập | TikTok';
    }, []);

    return (
        <>
            <LoginContainer />
            <BackButton />
        </>
    );
}

function LoginContainer() {
    return (
        <div className={cx('container')}>
            <form>
                <div className={cx('title')}>Đăng nhập</div>
                <LoginByEmail />
            </form>
            <div className={cx('modal-content-footer')}>
                <div>Bạn không có tài khoản?</div>
                <Link to={config.routes.register}>
                    <span className={cx('link-text')}>Đăng ký</span>
                </Link>
            </div>
        </div>
    );
}

function LoginByEmail({ onClick }) {
    const [showPass, setShowPass] = useState(false);
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [textErrorEmail, setTextErrorEmail] = useState('');
    const [showErrorPass, setShowErrorPass] = useState(false);
    const [textErrorPass, setTextErrorPass] = useState('');
    const inputPass = useRef();
    const inputEmail = useRef();

    const show = () => {
        setShowPass(!showPass);
        if (!showPass) {
            inputPass.current.type = 'text';
        } else {
            inputPass.current.type = 'password';
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

    const handleBlurPass = () => {
        if (inputPass.current.value === '') {
            setShowErrorPass(true);
            setTextErrorPass('Mật khẩu không được để trống!');
        } else {
            setShowErrorPass(false);
            setShowErrorPass('');
        }
    };

    const [changeColor, setChangeColor] = useState(true);

    const handleRemoveDis = () => {
        if (inputEmail.current.value !== '' && inputPass.current.value !== '') {
            setChangeColor(false);
        } else {
            setChangeColor(true);
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
            {showErrorEmail && <span style={{ color: 'red', fontSize: '14px' }}>{textErrorEmail}</span>}
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
            {showErrorPass && <span style={{ color: 'red', fontSize: '14px' }}>{textErrorPass}</span>}
            <SubmitInfo email1={inputEmail} password1={inputPass} change={changeColor} />
        </>
    );
}

function SubmitInfo({ email1, password1, change }) {
    const [showError, setShowError] = useState(false);
    const [showErrorText, setShowErrorText] = useState('email');

    const handleLogin = async (e) => {
        if(email1.current.value !== '' && password1.current.value !== '') {
            try {
                e.preventDefault();
                //lấy value trên form
                const email = email1.current.value;
                const password = password1.current.value;
    
                //gửi value từ form client đến server
                const respone = await axios.post(`${configBaseURL}/api/auth/login/phone-or-email`, {
                    email: email,
                    password: password,
                });
    
                if (respone.status === 200) {
                    setShowError(false)
                    const accessToken = respone.data.accessToken;
                    //decode lay ra thong tin payload
                    const payloadDecoded = jwt_decode(accessToken);
                    const idAccount = payloadDecoded._id;
                    const nickName = payloadDecoded.nickname;
                    const idUser = payloadDecoded.iduser;
                    const avatar = payloadDecoded.avatar;
                    const isNewUser = payloadDecoded.isNewUser;
    
                    if (payloadDecoded.role === 'user') {
                        window.location.href = config.routes.home;
                    } else {
                        window.location.href = config.routes.dashboard;
                    }
    
                    //save accessToken to client
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('idAccount', idAccount);
                    localStorage.setItem('nickName', nickName);
                    localStorage.setItem('idUser', idUser);
                    localStorage.setItem('avatar', avatar);
                    localStorage.setItem('isNewUser', isNewUser);
                }
            } catch (error) {
                if (error.response.status === 400) {
                    if(error.response.data === 'Invalid Email'){
                        setShowError(true)
                    } else {
                        setShowError(true)
                        setShowErrorText('mật khẩu')
                    }
                }
            }
        }
    };

    return (
        <>
            {showError ? <p style={{ color: 'red', fontWeight: '600' }}>Sai {showErrorText}, mời nhập lại</p> : <></>}
            <button className={cx('style-button')} onClick={handleLogin} disabled={change} id="submitBtn">
                Đăng nhập
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

export default LoginPhoneAndEmail;
