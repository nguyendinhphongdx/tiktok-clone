//Thư viện externor trước(thư viện bên ngoài)


//Thư viện internor sau(thư viện bên trong dự án)


function ItemLinkFooter({ data }) {
    return data.map((item, index) => {
        return (
            <span key={index}>
                <a href={item.path}>
                    <h5>{item.text}</h5>
                </a>
            </span>
        );
    });
}

export default ItemLinkFooter;
