import {saveLikeToggle, saveTweet} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets(tweets){
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}


function addTweet(tweet){
    return {
        type: "ADD_TWEET",
        tweet
    }
}


export function handleAddTweet(text, replyingTo){
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())
        return saveTweet({
            text, 
            author: authedUser,
            replyingTo
        }).then((tweet) => {
            dispatch(addTweet(tweet))
            dispatch(hideLoading())
        })

    }
}


function toggleTweet({id, authedUser, hasLiked}){
    return {
        type: TOGGLE_TWEET,
        id, authedUser, hasLiked
    }
}


/**  info = {id, authedUser, hasLiked} */
export function handleToggleTweet(info){
    return (dispatch) => {
        // Optimisitc update
        dispatch(toggleTweet(info))

        saveLikeToggle(info)
        .catch((e) =>{
            // toggle again to revert
            dispatch(toggleTweet(info))
            alert("Failed to like tweet, try again")
            console.warn("Error in handle toggle tweet " , e)
        })
    }
}