import { createContext, useState, useEffect} from "react";
import React from "react";
//import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) =>{
    const[isLoading, setIsLoading] =useState(true);
    const[feedback, setFeedback] = useState([]);
    const [feedbackEdit, SetFeedbackEdit] = useState({
        item: {},
        edit:false
    })

    useEffect(() => {
      fetchFeedback()
    }, [])
  
    // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  //delete feedback
    const deleteFeedback = async (id) => {
        // console.log('App',id);
        if (window.confirm("Are you sure you want to delete?")) {
          await fetch(`/feedback/${id}`, {method:'DELETE'})
          setFeedback(feedback.filter((item) => item.id !== id)); //will return minus the id passed
        }
      };
      //Add feedback
      const addFeedback = async(newFeedback) => {
        const response = await fetch('/feedback', {
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(newFeedback),
        })
        // console.log(newFeedback);
        const data = await response.json()
        setFeedback([data, ...feedback])
      };  
      //Update feedback item
      const updateFeedback = async(id,updItem) =>{
        const response = await fetch(`/feedback/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(updItem)
        })
        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {...item, 
            ...data } : item
            ))
      }

      //set item to be updated
      const editFeedback = (item) => {
        SetFeedbackEdit({
            item,
            edit:true
        })
      }

    return(<FeedbackContext.Provider 
        value={{
        feedback:feedback, //can also write just feedback instead of assigning
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        
    }}
    >
        {children}
    </FeedbackContext.Provider>
    );
}

export default FeedbackContext;