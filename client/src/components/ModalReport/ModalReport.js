//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong dự án)
import FormContent from './FormContent';
import styles from './ModalReport.module.scss';

const cx = classNames.bind(styles);

function ModalReport({ onClick, data }) {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('form-container')}>
                    <div className={cx('form')}>
                        <section>
                            <form className={cx('form-report')}>
                                    <FormContent onClick={onClick} data={data}/>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalReport;
