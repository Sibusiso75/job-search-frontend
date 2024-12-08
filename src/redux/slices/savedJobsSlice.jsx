import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
    name:"saveJobs",
    initialState:{
        savedJobs:[]
    },
    reducers:{
        saveJob:(state, action)=>{
           state.savedJobs.push(action.payload)
        },
        getsavedJob:(state, action)=>{
         state.savedJobs = action.payload.map(job=>{
            return {id:job._id,title:job.title,numberOfPeopleToHire:job.numberOfPeopleToHire,
                description:job.description,
                username:job.username,
                userId:job.userId,
                jobId:job.jobId,
                jobLocation:job.jobLocation,
                
                reside:job.reside,jobUrl:job.jobUrl,province:job.province,
                area:job.area,jobType:job.jobType}
        })
        
        },
        updateJob:(state, action)=>{
            const index = state.savedJobs.findIndex(job=>job.id===action.payload.id)
            state.savedJobs[index]={
                id:action.payload.id,
                userId:action.payload.userId,
                jobId:action.payload.jobId,
                title:action.payload.title,numberOfPeopleToHire:action.payload.numberOfPeopleToHire,
                description:action.payload.description,jobLocation:action.payloadjobLocation,
                reside:action.payload.reside,jobUrl:action.payload.jobUrl,
                province:action.payload.province,area:action.payload.area,jobType:action.payload.jobType,
                username:action.payload.username               }
            
        },
    }
})
export const {saveJob, getsavedJob, updateJob}=savedJobsSlice.actions
export default savedJobsSlice.reducer