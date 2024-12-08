import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userslice"
import articleReducer from "../slices/articleSlice"
import jobReducer from "../slices/jobSlice"
import reportReducer from "../slices/reportSlice"
import savedJobsReducer from "../slices/savedJobsSlice"
import employerReducer from "../slices/employerslice";
import feedbackReducer from "../slices/feedbackSlice";


const store = configureStore({
    reducer:{
       users:userReducer,
       employers:employerReducer,
       articles:articleReducer,
       jobs:jobReducer,
       reports:reportReducer,
       savedJobs:savedJobsReducer,
       feedbacks:feedbackReducer
    }
})
export default store