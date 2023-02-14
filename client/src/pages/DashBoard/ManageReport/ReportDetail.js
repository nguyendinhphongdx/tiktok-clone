import "./ReportDetail.scss";
export const ReportDetail = (props) => {
    const {data} = props;
    const getFirstData = data?.length ? data[0] : {};
    return (
        <div className="reportDetail">
            <h2 className="title">Đơn xin cấp tick xanh</h2>
            <div className="wrapContent">
                <p className="line"><span className="label">Họ và tên:</span> {getFirstData?.userCreated}</p>
                <p className="line"><span className="label">Nội dung:</span> {getFirstData?.content}</p>
                <p className="line"><span className="label">Xin chân thành cảm ơn!</span></p>
            </div>
            <div className="wrapFooter">
                <p className="line"> <span className="label">Ngày tạo:</span> {getFirstData?.createdAt}</p>
            </div>
        </div>
    )
}