import axios from 'axios';
import { useEffect, useState } from 'react';
import { configBaseURL } from '~/common/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import './ManageAccount.scss';
import { CustomModal } from '~/components/Modal/Modal';
import { ConfirmBox } from '~/components/ConfirmBox/ConfirmBox';
import { toast } from 'react-toastify';
import { FormEditAccount } from './FormEditAccount';

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
        name: 'Email',
    },
    {
        id: 4,
        name: 'Phone',
    },
    {
        id: 5,
        name: 'Role',
    },
    {
        id: 6,
        name: '',
    },
    {
        id: 7,
        name: '',
    },
];
function ManagerAccount() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [reload, setReload] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/accounts/all`);
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
        console.log(selectedItem);
        try {
            await axios.delete(`${configBaseURL}/api/accounts/delete/${selectedItem}`);
            setOpenModal(false);
            toast.success('Xoá thành công!');
            setReload(!reload);
        } catch (err) {
            console.log('err', err);
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
    const handleUpdate = async (values) => {
        try {
            const res = await axios.put(`${configBaseURL}/api/accounts/update/${selectedItem}`, {
                email: values.email,
                phone: values.phone,
                role: values.role,
            });
            if (res) {
                toast.success(res?.data?.message);
                setOpenEditForm(false);
                setReload(!reload);
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
        }
    };
    return (
        <div className="managerUser">
            <p className="title">Danh sách tài khoản: </p>
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmBox
                    handleClose={() => setOpenModal(false)}
                    title="Bạn có muốn xóa user này?"
                    handleConfirm={() => handleDelete()}
                />
            </CustomModal>
            <CustomModal open={openEditForm} handleClose={() => setOpenEditForm(false)}>
                <FormEditAccount id={selectedItem} handleUpdate={handleUpdate}/>
            </CustomModal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        {rowData.map((item) => (
                            <TableCell key={item.id}>{item.name}</TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row?.email}</TableCell>
                                <TableCell align="left">{row?.phone}</TableCell>
                                <TableCell align="left">{row?.role}</TableCell>
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

export default ManagerAccount;
