//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Uploader.module.scss';

const cx = classNames.bind(styles);

function Uploader() {
    const [video, setVideo] = useState();
    const inputFile = useRef();

    useEffect(() => {
        if (video) {
            // inputFile.current.style.display = 'block';
        }
        //cleanup
        return () => {
            video && URL.revokeObjectURL(video.preview);
        };
    }, [video]);

    const handlePreviewVideo = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setVideo(file);
    };

    const openChooseFile = () => {
        inputFile.current.click();
    };

    return (
        <div className={cx('uploader')}>
            <div className={cx('upload')}>
                {video ? (
                    <div className={cx('preview-container')}>
                        <video src={video.preview}  id='preview' controls disablePictureInPicture controlsList="nodownload noplaybackrate nofullscreen" autoPlay  loop muted className={cx('preview-video')}></video>
                        <div className={cx('preview-change-video')}>
                            <div>
                                <img src='https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/check_icon.8e166106.svg' alt=''/>
                                <span>{video.name}</span>
                            </div>
                            <label className={cx('btn-change')} onClick={openChooseFile}>Thay đổi video</label>
                        </div>
                    </div>
                ) : (
                    <>
                        <label className={cx('upload-card')} htmlFor={cx('uploadphoto')}>
                            <img
                                src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                alt=""
                                className={cx('cloud-icon')}
                            />
                            <div className={cx('text-main')}>
                                <span>Chọn video để tải lên</span>
                            </div>
                            <div className={cx('text-sub')}>
                                <span>Hoặc kéo và thả tập tin</span>
                            </div>
                            <div className={cx('text-video-info')}>
                                <div>
                                    <span>MP4 hoặc WebM</span>
                                </div>
                                <div>
                                    <span>Độ phân giải 720x1280 trở lên</span>
                                </div>
                                <div>
                                    <span>Tối đa 10 phút</span>
                                </div>
                                <div>
                                    <span>Nhỏ hơn 2GB</span>
                                </div>
                            </div>
                            <div className={cx('file-select-btn')}>
                                <Button primary={true} className={cx('upload-btn')} onClick={openChooseFile}>
                                    <div>
                                        <div>Chọn tập tin</div>
                                    </div>
                                </Button>
                            </div>
                        </label>
                    </>
                )}
                <input
                    type="file"
                    accept="video/*"
                    id={cx('uploadphoto')}
                    ref={inputFile}
                    onChange={handlePreviewVideo}
                    name="myVideo"
                    className={cx('file-upload')}
                />
            </div>
        </div>
    );
}

export default Uploader;
