import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { MdFavorite, MdFavoriteBorder, MdReply } from "react-icons/md";
import { handleToggleTweet } from '../actions/tweets';
import { Link } from 'react-router-dom';

const Tweet = ({ authedUser, tweet, dispatch }) => {
    if (tweet === null)
        return (<h1 className="center"> Sorry, tweet not found</h1>)

    // Check tweet object properties in helpers.js formatTweet function
    const {
        name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = tweet



    const handleLike = (e, liked) => {
        e.preventDefault()

        dispatch(handleToggleTweet({id, authedUser, hasLiked}))
    }


    return (
        <Link to={`/tweet/${id}`} className="tweet">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />


            <div className="tweet-info">
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>

                    {parent && (
                        <Link to={`/tweet/${parent.id}`} className="replying-to" >
                            Replying to @{parent.author}
                        </Link>
                    )}

                    <p>{text}</p>
                </div>


                <div className="tweet-icons">
                    <MdReply className="tweet-icon" />
                    <span> {replies !== 0 && replies}</span>

                    {
                        hasLiked ?
                            <MdFavorite className="tweet-icon" onClick={e => handleLike(e)} />
                            :
                            <MdFavoriteBorder className="tweet-icon" onClick={e => handleLike(e)} />
                    }
                    <span> {likes !== 0 && likes}</span>
                </div>

            </div>

        </Link>
    )
}

function mapStateToProps({ users, tweets, authedUser }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet && tweet.replyingTo ? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }

}

export default connect(mapStateToProps)(Tweet)