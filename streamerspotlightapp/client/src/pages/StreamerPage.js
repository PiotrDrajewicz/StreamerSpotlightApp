import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStreamerInfo } from "../functions/streamersDatabaseFunctions";

const StreamerPage = () => {
    const { id } = useParams();
    const [streamerInfo, setStreamerInfo] = useState({});

    
    useEffect(() => {
        getStreamerInfo(id, setStreamerInfo);
    }, [])

    return (
        <section className="streamer-section">
            <div className="streamer-container">
                <div className="photo-container">
                    <img src={streamerInfo.photo} alt="photo of the streamer" />
                </div>
                <div className="text-container">
                    <h1 className="streamer-info-name">{streamerInfo.name}</h1>
                    <h2 className="streamer-info-platform">{streamerInfo.platform}</h2>
                    <p className="streamer-info-description">{streamerInfo.description}</p>
                </div>
            </div>
        </section>
    )
}

export default StreamerPage;