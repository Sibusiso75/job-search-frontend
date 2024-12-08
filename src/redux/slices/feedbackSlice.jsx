import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
    name:"feedbacks",
    initialState:{
        feedbacks:[]
    },
    reducers:{
        addfeedBack:(state, action)=>{
           state.feedbacks.push(action.payload)
        },
        getfeedback:(state, action)=>{
         state.feedbacks = action.payload.map(feedback=>{
            return {id:feedback._id, username:feedback.username,
                userId:feedback.userId,
                feedbackMessage:feedback.feedbackMessage
                }
        })
        
        },
        updateFeedback:(state, action)=>{
            const index = state.feedbacks.findIndex(f=>f.id===action.payload.id)
            state.feedbacks[index]={
                id:action.payload.id,
                userId:action.payload.userId,
                feedbackMessage:action.payload.feedbackMessage,
                username:action.payload.username        
            }
            
        },
        deleteFeedback:(state, action)=>{
            state.feedbacks.filter(feedback=>feedback.id!==action.payload.id)

        }
    }
})
export const {addfeedBack,  getfeedback}=feedbackSlice.actions
export default feedbackSlice.reducer