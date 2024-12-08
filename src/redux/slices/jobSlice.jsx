import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"jobs",
    initialState:{
        jobs:[]
    },
    reducers:{
        addJob:(state, action)=>{
           state.jobs.push(action.payload)
        },
        getJob:(state, action)=>{
         state.jobs = action.payload.map(job=>{
            return {id:job._id,title:job.title,numberOfPeopleToHire:job.numberOfPeopleToHire,
                description:job.description,createdAt:job.createdAt,
                username:job.username,
                userId:job.userId,
                jobId:job.jobId,
                jobLocation:job.jobLocation,
                
                reside:job.reside,jobUrl:job.jobUrl,province:job.province,
                area:job.area,jobType:job.jobType}
        })
        
        },
        updateJob:(state, action)=>{
            const index = state.jobs.findIndex(job=>job.id===action.payload.id)
            state.jobs[index]={
                id:action.payload.id,
                userId:action.payload.userId,
                title:action.payload.title,numberOfPeopleToHire:action.payload.numberOfPeopleToHire,
                description:action.payload.description,jobLocation:action.payloadjobLocation,
                reside:action.payload.reside,jobUrl:action.payload.jobUrl,
                province:action.payload.province,area:action.payload.area,jobType:action.payload.jobType,
                username:action.payload.username        
            }
            
        },
    }
})
export const {addJob, getJob, updateJob}=jobSlice.actions
export default jobSlice.reducer