import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'



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
          : <Dashboard/>
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