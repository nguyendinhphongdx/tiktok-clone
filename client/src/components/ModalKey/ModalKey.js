//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useRef } from 'react';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './ModalKey.module.scss';
import { CloseModal } from '~/components/Icons';
import KeyboardShortcutItem from './KeyboardShortcutItem';

const cx = classNames.bind(styles);

function ModalKey({ onClick, styles }) {
    const modal = useRef();

    const hideModal = () => {
        const modal = document.querySelector('#modal-keyboard');
        const content = document.querySelector('#content-container')
        modal.style.visibility = 'hidden';
        content.style.visibility = 'hidden';
    };

    return (
        <div className={cx('container')} ref={modal} style={styles} id="modal-keyboard">
            <div className={cx('mask')}></div>
            <div className={cx('content-container')} id='content-container'>
                <div className={cx('keyboard-shortcut-container')}>
                    <div className={cx('keyboard-xmark-wrapper')} onClick={hideModal}>
                        <CloseModal />
                    </div>
                    <div className={cx('keyboard-shortcut-title')}>Phím tắt trên bàn phím</div>
                    <div className={cx('keyboard-shortcut-content')}>
                        <KeyboardShortcutItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalKey;
