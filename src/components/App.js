import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'



class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render() {
    console.log("Loading : " , this.props.loading);
    return (
      <div>
        <LoadingBar/>

        {
          this.props.loading === true ? <h1 className="center"> Loading ... </h1>
          : <TweetPage match={{params:{id:"2mb6re13q842wu8n106bhk"}}}/>
        }
        
      </div>
    )
  }
}

function mapStateToProps ({authedUser}){
  return {
    loading: authedUser === null
  }
}





export default connect(mapStateToProps) (App)