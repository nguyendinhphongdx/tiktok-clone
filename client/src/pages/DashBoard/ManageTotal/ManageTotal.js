import { ReportChart } from '../ManageReport/ReportChart';
import './ManageTotal.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';

const listTabs = [
    {
        id: 1,
        name: 'Thống kê doanh thu quảng cáo',
        component: ReportChart,
    },
    {
        id: 2,
        name: 'Thống kê âm nhạc',
        component: ReportChart,
    },
    {
        id: 3,
        name: 'Thống kê video',
        component: ReportChart,
    },
];
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const ManageTotal = () => {
    const [value, setValue] = useState(0);
    const [dataVideo, setDataVideo] = useState();
    console.log('dataVideo', dataVideo);
    const [dataMusic, setDataMusic] = useState();
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getData = async () => {
        try {
            const resMusic = await axios.get('api/music/get-report');
            setDataMusic(resMusic?.data)
            const resVideo = await axios.get('api/video/get-report');
            setDataVideo(resVideo?.data);
        } catch (err) {
            console.log('err', err);
            // toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="total">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {listTabs.map((item) => (
                        <Tab key={item.index} label={item.name} {...a11yProps(item.id)} />
                    ))}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ReportChart />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="total">
                    <div className="wrapTotal">
                        <span>Tổng bài hát: {dataMusic?.total}</span>
                    </div>
                    <div className="wrapTotal">
                        <span>Tổng lượt xem: {dataMusic?.totalWatch}</span>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className="total">
                    <div className="wrapTotal">
                        <span>Tổng video: {dataVideo?.total}</span>
                    </div>
                    <div className="wrapTotal">
                        <span>Tổng lượt xem: {dataVideo?.totalWatch}</span>
                    </div>
                    <div className="wrapTotal">
                        <span>Tổng lượt thích: {dataVideo?.totalHeartCount}</span>
                    </div>
                </div>
            </TabPanel>
        </div>
    );
};
export default ManageTotal;
