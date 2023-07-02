import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { addVote, subtractVote } from '../functions/votesFunctions';
import { getVotes } from '../functions/streamersDatabaseFunctions';

const StreamerItem = ({id, name}) => {
    const [usersVote, setUsersVote] = useState(localStorage.getItem(id) || '');
    const [votesCount, setVotesCount] = useState({});
    const [upvotesCount, setUpvotesCount] = useState(0);
    const [downvotesCount, setDownvotesCount] = useState(0);
    const navigate = useNavigate();

    //streamer voting
    const castVote = async (id, oldVotes, operation) => {
        const {upVotes: oldUpvotes, downVotes: oldDownvotes} = oldVotes;
        try {
            if (operation === 'giveUpvote') {
                if (usersVote === 'upvoted') {
                    //subtracting upvote (if already upvoted)
                    await subtractVote(id, oldUpvotes, 'upVotes');
                    setUpvotesCount(prev => prev - 1);
                    setUsersVote('');
                    localStorage.setItem(`${id}`, '');
                } else {
                    //adding upvote (if wasn't upvoted)
                    await addVote(id, oldUpvotes, 'upVotes');
                    setUpvotesCount(prev => prev + 1);
                    if (usersVote === 'downvoted') {
                        //subtracting downvote (if was downvoted)
                        await subtractVote(id, oldDownvotes, 'downVotes');
                        setDownvotesCount(prev => prev - 1);
                    }
                    setUsersVote('upvoted');
                    localStorage.setItem(`${id}`, 'upvoted');
                }
            }
            if (operation === 'giveDownvote') {
                if (usersVote === 'downvoted') {
                    //subtracting downvote (if already downvoted)
                    await subtractVote(id, oldDownvotes, 'downVotes');
                    setDownvotesCount(prev => prev - 1);
                    setUsersVote('');
                    localStorage.setItem(`${id}`, '');
                } else {
                    //adding downvote (if wasn't downvoted)
                    await addVote(id, oldDownvotes, 'downVotes');
                    setDownvotesCount(prev => prev + 1);
                    if (usersVote === 'upvoted') {
                        //subtracting upvote (if was upvoted)
                        await subtractVote(id, oldUpvotes, 'upVotes');
                        setUpvotesCount(prev => prev - 1);
                    }
                    setUsersVote('downvoted');
                    localStorage.setItem(`${id}`, 'downvoted');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    //stop event bubbling for voting
    const doNotEnterStreamer = e => {
        e.stopPropagation();
    }

    
    useEffect(() => {
        getVotes(id, setVotesCount, setUpvotesCount, setDownvotesCount);
    }, [usersVote])

    return (
        <article className='streamer-item' onClick={() => {navigate(`/streamers/${id}`)}}>
        <div className='streamer-item-content'>
            <h3 className='streamer-item-name'>{name}</h3>
            <div className='voting-container' onClick={doNotEnterStreamer}>
                <FontAwesomeIcon className='voteIcon upvoteIcon' icon={faThumbsUp} size='2x' color={usersVote === 'upvoted' ? 'rgb(82, 184, 82)' : 'rgb(141, 141, 141)'} onClick={() => {castVote(id, votesCount, 'giveUpvote')}} />
                <p className='streamer-item-votes'>{upvotesCount}</p>
                <p className='streamer-item-votes'>{downvotesCount}</p>
                <FontAwesomeIcon className='voteIcon downvoteIcon' icon={faThumbsDown} size='2x' color={usersVote === 'downvoted' ? 'rgb(241, 68, 68)' : 'rgb(141, 141, 141)'} onClick={() => {castVote(id, votesCount, 'giveDownvote')}}/>
            </div>
        </div>
    </article>
    )
}

export default StreamerItem;