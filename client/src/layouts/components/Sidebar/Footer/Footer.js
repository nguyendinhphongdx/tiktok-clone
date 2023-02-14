// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import { useState } from 'react';

import styles from './Footer.module.scss';
import FooterLinkContainer from './FooterLinkContainer';

const cx = classNames.bind(styles);

function Footer() {
    const linkArray = [
        {
            link: [
                {
                    text: 'Giới thiệu',
                    path: 'https://www.tiktok.com/about?lang=vi-VN',
                },
                {
                    text: 'TikTok Browse',
                    path: 'https://www.tiktok.com/browse',
                },
                {
                    text: 'Bảng tin',
                    path: 'https://newsroom.tiktok.com/vi-vn/',
                },
                {
                    text: 'Liên hệ',
                    path: 'https://www.tiktok.com/about/contact?lang=vi-VN',
                },
                {
                    text: 'Sự nghiệp',
                    path: 'https://careers.tiktok.com/',
                },
                {
                    text: 'ByteDance',
                    path: 'https://www.bytedance.com/',
                },
            ],
        },
        {
            link: [
                {
                    text: 'TikTok for Good',
                    path: 'https://www.tiktok.com/forgood',
                },
                {
                    text: 'Quảng cáo',
                    path: 'https://www.tiktok.com/business/vi?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&refer=tiktok_web&tt4b_lang_redirect=1',
                },
                {
                    text: 'Developers',
                    path: 'https://developers.tiktok.com/?refer=tiktok_web',
                },
                {
                    text: 'Transparency',
                    path: 'https://www.tiktok.com/transparency/vi-vn/',
                },
                {
                    text: 'TikTok Rewards',
                    path: 'https://www.tiktok.com/tiktok-rewards/eligibility/',
                },
            ],
        },
        {
            link: [
                {
                    text: 'Trợ giúp',
                    path: 'https://support.tiktok.com/vi',
                },
                {
                    text: 'An toàn',
                    path: 'https://www.tiktok.com/safety/vi-vn/',
                },
                {
                    text: 'Điều khoản',
                    path: 'https://www.tiktok.com/legal/terms-of-service-row?lang=vi',
                },
                {
                    text: 'Quyền riêng tư',
                    path: 'https://www.tiktok.com/legal/page/row/privacy-policy/vi-VN',
                },
                {
                    text: 'Creator Portal',
                    path: 'https://www.tiktok.com/creators/creator-portal/en-us/',
                },
                {
                    text: 'Hướng dẫn cộng đồng',
                    path: 'https://www.tiktok.com/community-guidelines?lang=vi-VN',
                },
            ],
        },
    ];

    return (
        <div className={cx('wrapper')}>
            {linkArray.map((data, index) => {
                return <FooterLinkContainer key={index} data={data.link} />;
            })}
            <span className={cx('coppy-right')}>@ 2022 TikTok by Tuấn</span>
        </div>
    );
}

// Footer.propTypes = {
//     label: PropTypes.string.isRequired,
// };

export default Footer;
