import React, {useState} from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'


const NewTweet = ({dispatch, id}) => {
    const [text, setText] = useState('')
    
    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        //console.log("Submitted text",text);
        dispatch(handleAddTweet(text, id))
        setText('')

    }

    return (
        <div>
            <h2 className="center"> Compose Tweet </h2>
            <form className="new-tweet" onSubmit={handlesubmit}> 
                <textarea 
                value={text}
                onChange={handleChange}
                placeholder="What's on your mind? "
                className="textarea"
                maxLength={280}
                />

                {/* {Max tweet length warning} */}
                {280 - text.length <= 100 && (
                    <div className="tweet-length">{280 - text.length}</div>
                )}

                <button
                    className="btn"
                    type="submit"
                    disabled={text.length === 0}
                > Tweet
                
                </button>
            </form>

        </div>
    )
}

export default connect()(NewTweet)