import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

const TweetPage = ({ id, replies, dispatch }) => {
    return (
        <div>
            <Tweet id={id} />
            <NewTweet id={id} />

            {
                replies.length &&
                <h3 className="center">Replies</h3>
            }

            <ul>
                {
                    replies.map(tweetId => (

                        <li key={tweetId}>
                            <Tweet id={tweetId}/>

                        </li>
                    ))
                }
            </ul>


        </div>
    )
}

function mapStateToProps({ authedUser, tweets, users }, props) {
    const { id } = props.match.params

    return {
        id,
        replies: !tweets[id] ?
            []
            :
            tweets[id].
                replies.sort((x, y) => tweets[y].timestamp - tweets[x].timestamp)
    }

}

export default connect(mapStateToProps)(TweetPage)
