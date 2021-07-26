import { getInitialData } from "../utils/api";
import { receiveTweets} from './tweets'
import { receiveUsers} from './users'
import {setAuthedUser} from './authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'

const authed_user_id = 'dan_abramov'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(authed_user_id))
                dispatch(hideLoading())
            })



    }
}

