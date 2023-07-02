
//get streamers list from the database
export const getStreamers = async (setListOfStreamers, setListLength) => {
    try {
        const res = await fetch('http://localhost:5000/streamers');
        const data = await res.json();
        setListOfStreamers(data);
        setListLength(data.length);
    } catch (error) {
        console.error(error);
    }
}

//add a streamer to the database
export const postStreamer = async (streamerObject) => {
    try {
        await fetch('http://localhost:5000/streamers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(streamerObject)
        })
    } catch (error) {
        console.error(error);
    }
}

//get votes from the database
export const getVotes = async (id, setVotesCount, setUpvotesCount, setDownvotesCount) => {
    try {
        const res = await fetch(`http://localhost:5000/streamers/${id}`);
        const data = await res.json();
        setVotesCount(data);
        setUpvotesCount(data.upVotes);
        setDownvotesCount(data.downVotes);
    } catch (error) {
        console.error(error);
    }
}

//get info about the particular streamer
export const getStreamerInfo = async (id, setStreamerInfo) => {
    try {
        const res = await fetch(`http://localhost:5000/streamers/${id}`);
        const data = await res.json();
        setStreamerInfo(data);
    } catch (error) {
        console.error(error);
    }
}