import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit) {
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
            setBtnDisabled(false)
        }
    }, [feedbackEdit])

    const textChangeHandler = e => {
        if (text.trim().length === 0) {
            setMessage(null)
        } else if (text.trim().length <= 9) {
            setMessage('Your review should be at least 10 characters long')
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }

        setText(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()
        if (text.length >= 10) {
            const newFeedback = {
                text,
                rating
            }

            if (feedbackEdit.edit) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else addFeedback(newFeedback)

            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={submitHandler}>
                <h2>Please rate our service</h2>
                <RatingSelect select={rating => setRating(rating)} />
                <div className="input-group">
                    <input 
                        type='text' 
                        placeholder='Write a review' 
                        onChange={textChangeHandler}
                        value={text}
                    />
                    <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                </div>

                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm