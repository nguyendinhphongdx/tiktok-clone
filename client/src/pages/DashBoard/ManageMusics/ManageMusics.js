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
import './ManageMusic.scss';
import { CustomModal } from '~/components/Modal/Modal';
import { ConfirmBox } from '~/components/ConfirmBox/ConfirmBox';
import { toast } from 'react-toastify';
import { FormMusicEdit } from './FormEdit';

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
        name: 'Thumbnail',
    },
    {
        id: 4,
        name: 'Name',
    },
    {
        id: 5,
        name: 'Music',
    },
    {
        id: 6,
        name: 'Singer',
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

function ManagerMusics() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [reload, setReload] = useState(false);

    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/music/get-list-music`);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (err) {}
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`${configBaseURL}/api/music/delete/${selectedItem}`, configHeader);
            setOpenModal(false);
            toast.success('Xoá thành công!');
            setReload(!reload);
        } catch (err) {
            setOpenModal(false);
            toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
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
    const handleOpenCreateForm = (id) => {
        setSelectedItem('');
        setOpenEditForm(true);
    };
    const handleUpdateMusic = async (values) => {
      
        try {
            const url = `${configBaseURL}/api/music/update/${selectedItem}`;
            const bodyFormData = new FormData();
            bodyFormData.append('files', values.image);
            bodyFormData.append('files', values.audio);
            bodyFormData.append('singer', values.singer);
            bodyFormData.append('name', values.name);
            const res = await axios.post(url, bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(res.data?.message);
            setReload(!reload);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
        }
    };
    const handleCreateNew = async (values) => {
        try {
            const url = `${configBaseURL}/api/music/upload-music`;
            const bodyFormData = new FormData();
            bodyFormData.append('files', values.image);
            bodyFormData.append('files', values.audio);
            bodyFormData.append('singer', values.singer);
            bodyFormData.append('name', values.name);
            const res = await axios.post(url, bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(res.data?.message);
            setReload(!reload);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
        }
    };

    useEffect(() => {
        getData();
    }, [reload]);
    return (
        <div className="managerMusic">
            <Button variant="contained" onClick={handleOpenCreateForm}>
                Thêm bài hát mới
            </Button>
            <p className="title">List Musics: </p>
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmBox
                    handleConfirm={() => handleDelete()}
                    handleClose={() => setOpenModal(false)}
                    title="Bạn có muốn xóa bài hát này?"
                />
            </CustomModal>
            <CustomModal open={openEditForm} handleClose={() => setOpenEditForm(false)}>
                <FormMusicEdit id={selectedItem} handleUpdate={handleUpdateMusic} handleCreateNew={handleCreateNew} />
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
                                <TableCell align="left">
                                    <img className="thumbnail" src={row.thumbnail} alt="" />
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">
                                    {!!row?.music && (
                                        <audio controls autoplay>
                                            <source src={row?.music} type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </TableCell>
                                <TableCell align="left">{row.singer}</TableCell>
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
                                        Xóa
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
export default ManagerMusics;
