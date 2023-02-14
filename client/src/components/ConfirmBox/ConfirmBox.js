import { Button } from '@mui/material';
import './ConfirmBox.scss';

export const ConfirmBox = (props) => {
    const { title, titleButton, handleClose, handleConfirm } = props;
    return (
        <div className="confirmBox">
            <p className="title">{title}</p>
            <div className="wrapButton">
                <Button variant="contained" onClick={handleConfirm}>
                    {titleButton || 'Xác nhận'}
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                    Thoát
                </Button>
            </div>
        </div>
    );
};
