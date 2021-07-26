import {
    ADD_TWEET,
    RECEIVE_TWEETS,
    TOGGLE_TWEET
} from '../actions/tweets';



// Reducer for a single tweet
function tweetReducer (tweet={}, action){
    switch(action.type){
        case TOGGLE_TWEET:
            return {
                ...tweet,
                likes: action.hasLiked===false?
                            [...tweet.likes, action.authedUser]
                            :
                            tweet.likes.filter((userId) => userId !==action.authedUser)
            }

        // action contains a tweet that is a reply to the current tweet (the one in the parameters)
        case ADD_TWEET:
            return {
                ...tweet,
                replies: [...tweet.replies, action.tweet.id]
            }
        default:
            return tweet
    }
}


export default function tweets(state = {}, action){
    switch (action.type) {
        case RECEIVE_TWEETS:
            return  {...state, ...action.tweets}
        case TOGGLE_TWEET:
            return {...state, 
                [action.id]:tweetReducer(state[action.id], action)
            }
    
        case ADD_TWEET:
            const {tweet} = action

            let tweetReplyingTo = {}
            if (tweet.replyingTo !== null){
                tweetReplyingTo = {
                    [tweet.replyingTo]: tweetReducer(state[tweet.replyingTo], action)
                }
            }


            return {
                ...state,
                [tweet.id] : action.tweet,
                ...tweetReplyingTo
            }
        default:
            return state
    }
}