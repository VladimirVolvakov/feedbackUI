import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is item 1 from context',
            rating: 10
        },
        {
            id: 2,
            text: 'This is item 2 from context',
            rating: 4
        },
        {
            id: 3,
            text: 'This is item 3 from context',
            rating: 8
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

// Add feedback:
    const addFeedback = newFeedback => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

// Delete feedback:
    const deleteFeedback = id => {
        if (window.confirm('Are you sure you want to delete it?')) {
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }

// Set feedback to be updated:
    const editFeedback = item => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

// Update feedback item:
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map(item => item.id === id ? {...item, ...updItem} : item ))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>{ children }</FeedbackContext.Provider>
}

export default FeedbackContext