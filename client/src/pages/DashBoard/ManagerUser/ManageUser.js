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
import { Avatar, Button, FormControl, MenuItem } from '@mui/material';
import '../ManagerAccount/ManageAccount.scss';
import { CustomModal } from '~/components/Modal/Modal';
import { ConfirmBox } from '~/components/ConfirmBox/ConfirmBox';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import { FormEditUser } from './FormEditUser';

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
        name: 'Avatar',
    },
    {
        id: 4,
        name: 'Tên',
    },
    {
        id: 5,
        name: 'Nickname',
    },
    {
        id: 6,
        name: 'Mô tả',
    },
    {
        id: 7,
        name: 'Tick',
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
const CustomFormSelectStatus = (props) => {
    const { status, handleUpdateTickStatus, id } = props;
    const [value, setValue] = useState(status ? 1 : 2);
    const handleChange = (event) => {
        setValue(event.target.value);
        handleUpdateTickStatus(id);
    };
    return (
        <FormControl fullWidth>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                onChange={handleChange}
            >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={2}>UnActive</MenuItem>
            </Select>
        </FormControl>
    );
};
function ManagerUser() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [reload, setReload] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);

    const getData = async () => {
        try {
            const res = await axios.get(`${configBaseURL}/api/users/get-list`);
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
            await axios.delete(`${configBaseURL}/api/users/delete/${selectedItem}`);
            setOpenModal(false);
            toast.success('Xoá thành công!');
            setReload(!reload);
        } catch (err) {
            console.log('err', err);
            setOpenModal(false);
            toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
        }
    };

    const handleUpdateTickStatus = async (id) => {
        try {
            const res = await axios.put(`${configBaseURL}/api/users/update/${id}`);
            if (res) {
                toast.success(res?.data?.message);
            }
            setReload(!reload);
        } catch (err) {
            console.log('err', err);
            toast.error(err?.response?.data?.message || 'Đã có lỗi xảy ra! hãy thử lại');
        }
    };
    const handleOpenEditForm = (id) => {
        setSelectedItem(id);
        setOpenEditForm(true);
    };
    const handleSelectItem = (id) => {
        setSelectedItem(id);
        setOpenModal(true);
    };
    const handleUpdate = async (values) => {
        console.log(values);
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('name', values.name);
            bodyFormData.append('nickname', values.nickname);
            bodyFormData.append('description', values.description);
            if(values?.image){
                bodyFormData.append('image', values.image);
            }
            console.log('form', bodyFormData.value);
            const res = await axios.post(`${configBaseURL}/api/users/update-info/${selectedItem}`, bodyFormData);
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
            <p className="title">Danh sách người dùng: </p>
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmBox
                    handleClose={() => setOpenModal(false)}
                    title="Bạn có muốn xóa user này?"
                    handleConfirm={() => handleDelete()}
                />
            </CustomModal>
            <CustomModal open={openEditForm} handleClose={() => setOpenEditForm(false)}>
                <FormEditUser id={selectedItem} handleUpdate={handleUpdate} />
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
                                <TableCell align="left">{row?.id}</TableCell>
                                <TableCell align="left"><Avatar src={row?.avatar}/></TableCell>
                                <TableCell align="left">{row?.name}</TableCell>
                                <TableCell align="left">{row?.nickname}</TableCell>
                                <TableCell align="left">{row?.description}</TableCell>
                                <TableCell align="left">
                                    <CustomFormSelectStatus
                                        handleUpdateTickStatus={handleUpdateTickStatus}
                                        status={row?.tick}
                                        id={row?.id}
                                    />
                                </TableCell>
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

export default ManagerUser;
