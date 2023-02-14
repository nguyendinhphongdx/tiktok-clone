//Thư viện externor trước(thư viện bên ngoài)
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function DashBoard() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/admin/dashboard/manageAccount');
        return () => {
            // clean up
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
}

export default DashBoard;
