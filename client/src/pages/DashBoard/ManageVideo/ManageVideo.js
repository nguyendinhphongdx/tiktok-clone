/* eslint-disable react/jsx-no-target-blank */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { configBaseURL, configHeader } from '~/common/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import '../ManageMusics/ManageMusic.scss';
import { CustomModal } from '~/components/Modal/Modal';
import { ConfirmBox } from '~/components/ConfirmBox/ConfirmBox';
import { toast } from 'react-toastify';
import { FormEditVideo } from './FormEditVideo';

const rowData = [
    {
        id: 1,
        name: 'STT',
    },
    {
        id: 2,
        name: 'Id',
    },
    {
        id: 3,
        name: 'Author',
    },
    {
        id: 4,
        name: 'Music',
    },
    {
        id: 5,
        name: 'Trendy',
    },
    {
        id: 6,
        name: 'Video',
    },
    {
        id: 7,
        name: 'Description',
    },
    {
        id: 8,
        name: '',
    },
    {
        id: 9,
        name: '',
    },
];

function ManagerVideos() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [reload, setReload] = useState(false);

    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/video/get-list-videos`);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (err) {
            console.log('err', err);
        }
    };

    useEffect(() => {
        getData();
    }, [reload]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${configBaseURL}/api/video/delete/${selectedItem}`, configHeader);
            setOpenModal(false);
            toast.success('Xo?? th??nh c??ng!');
            setReload(!reload);
        } catch (err) {
            console.log('err', err);
            setOpenModal(false);
            toast.error(err?.response?.data?.message || '???? c?? l???i x???y ra! h??y th??? l???i');
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItem(id);
        setOpenModal(true);
    };

    const handleOpenEditForm = (id) => {
        setSelectedItem(id);
        setOpenEditForm(true);
    };

    const handleUpdateVideo = async (values) => {
        try {
            const url = `${configBaseURL}/api/video/admin-update/${selectedItem}`;
            const bodyFormData = new FormData();
            bodyFormData.append('files', values.video);
            bodyFormData.append('description', values.description);
            const res = await axios.post(url, bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(res.data?.message);
            setReload(!reload);
        } catch (err) {
            toast.error(err?.response?.data?.message || '???? c?? l???i x???y ra! h??y th??? l???i');
        }
    };

    return (
        <div className="managerMusic">
            <p className="title">Danh s??ch video: </p>
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmBox
                    handleConfirm={() => handleDelete()}
                    handleClose={() => setOpenModal(false)}
                    title="B???n c?? mu???n x??a video n??y?"
                />
            </CustomModal>
            <CustomModal open={openEditForm} handleClose={() => setOpenEditForm(false)}>
                <FormEditVideo id={selectedItem} handleUpdate={handleUpdateVideo} />
            </CustomModal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        {rowData.map((item) => (
                            <TableCell key={item.id}>{item.name}</TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row?.author?.name}</TableCell>
                                <TableCell align="left">
                                    <a className="link" href={row?.music?.music} target="_blank">
                                        Nghe nh???c
                                    </a>
                                </TableCell>
                                <TableCell align="left">{row?.trendy?.name}</TableCell>
                                <TableCell align="left">
                                    <a href={row?.video} target="_blank">
                                        {row?.video}
                                    </a>
                                </TableCell>
                                <TableCell align="left">{row?.description}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        onClick={() => handleOpenEditForm(row.id)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => handleSelectItem(row.id)} variant="contained" color="error">
                                        X??a
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default ManagerVideos;
