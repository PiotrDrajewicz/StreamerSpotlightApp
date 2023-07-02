export const addVote = async (id, oldVotes, votesType) => {
    try {
        await fetch(`http://localhost:5000/streamers/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({[votesType]: oldVotes + 1})
        })
    } catch (error) {
        console.error(error);
    }
}

export const subtractVote = async (id, oldVotes, votesType) => {
    try {
        await fetch(`http://localhost:5000/streamers/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({[votesType]: oldVotes - 1})
        })
    } catch (error) {
        console.error(error);
    }
}