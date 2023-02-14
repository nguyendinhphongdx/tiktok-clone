import { useEffect } from "react";

function Live() {

    useEffect(() => {
        document.title = 'TikTok LIVE | TikTok'
    },[])

    return <h2 style={{position: 'absolute', top: '50%', left: '50%'}}>Coming soon!</h2>;
}

export default Live;
