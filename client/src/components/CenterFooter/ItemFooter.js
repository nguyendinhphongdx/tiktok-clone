//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import ItemLinkFooter from './ItemLinkFooter';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './CenterFooter.module.scss';

const cx = classNames.bind(styles);

function ItemFooter() {
    const linkArray = [
        {
            title: 'Công ty',
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
            title: 'Chương trình',
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
            title: 'Hỗ trợ',
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
        {
            title: 'Pháp lý',
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
        <>
            {linkArray.map((item, index) => {
                return (
                <div className={cx('footer-content-column')} key={index}>
                    <h4>{item.title}</h4>
                    <ItemLinkFooter data={item.link}/>
                </div>
                )
            })}
        </>
    );
}

export default ItemFooter;
