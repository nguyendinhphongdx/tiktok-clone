import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import './ManageReport.scss';
import { CustomModal } from '~/components/Modal/Modal';
import { ListReport } from '~/Mock/report';
import { ReportDetail } from './ReportDetail';
import { useState } from 'react';
const rowData = [
    {
        id: 1,
        name: 'STT',
    },
    {
        id: 2,
        name: 'id',
    },
    {
        id: 3,
        name: 'Tên đơn',
    },
    // {
    //     id: 4,
    //     name: 'Loại đơn',
    // },
    {
        id: 5,
        name: 'Người tạo',
    },
    {
        id: 6,
        name: 'Thời gian tạo',
    },
    {
        id: 7,
        name: 'Trạng thái',
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
export const ManageReport = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [data, setData] = useState(ListReport?.length ? ListReport : []);
    const handleSelectItem = (id) => {
        setSelectedItem(id);
        setOpenModal(true);
    };
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    return (
        <div className="managerReport">
            <p className="title">Danh sách đơn: </p>
            {/* <CustomModal open={openModalConfirm} handleClose={() => setOpenModalConfirm(false)}>
                <ConfirmBox
                    handleClose={() => setOpenModalConfirm(false)}
                    title="Bạn có muốn xóa user này?"
                    handleConfirm={() => handleDelete()}
                />
            </CustomModal> */}
            <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
                <ReportDetail data={data.filter((item) => item.id === selectedItem)} />
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
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.userCreated}</TableCell>
                                <TableCell align="left">{row.createdAt}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        onClick={() => handleSelectItem(row.id)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Xem
                                    </Button>
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => handleDelete(row.id)} variant="contained" color="error">
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
};
