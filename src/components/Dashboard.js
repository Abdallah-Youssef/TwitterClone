import React from 'react'
import { connect} from 'react-redux'
import Tweet from './Tweet'

const Dashboard = ({tweetIds, dispatch}) => {
    return (
        <div>
            <h2 className="center">Dashboard</h2>

            <ul className="dashboard-list">
                {tweetIds.map((tweetId) => (
                    
                    <li key={tweetId}>
                        <Tweet id={tweetId}/>
                        
                    </li>
                ))}
            </ul>

        </div>
    )
}

function mapStateToProps({tweets}) {
    return {
        tweetIds: Object.keys(tweets)
        .sort((x, y) => tweets[y].timestamp - tweets[x].timestamp) // Sort by descending timestamp
    }
}

export default connect(mapStateToProps)(Dashboard)

