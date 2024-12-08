import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name:"reports",
    initialState:{
        reports:[]
    },
    reducers:{
        addReport:(state, action)=>{
           state.reports.push(action.payload)
        },
       
        getReport:(state, action)=>{
         state.reports = action.payload.map(report=>{
             return {
                id:report._id,
                title:report.title,
                description:report.description,
                numberOfPeopleToHire:report.numberOfPeopleToHire,
                jobUrl:report.jobUrl,
                jobLocation:report.jobLocation,
                reside:report.reside,
                province:report.province,
                jobType:report.jobType,
                area:report.area,
                username:report.username,
                jobId:report.jobId,
                userId:report.userId,
                status:report.status,
               reportMessage:report.reportMessage,
             }
        })
        },
        updateReport:(state, action)=>{
        const index = state.reports.findIndex((r)=>r.id==action.payload.id)
        state.reports[index]={
            id:action.payload.id,
                title:action.payload.title,
                description:action.payload.description,
                numberOfPeopleToHire:action.payload.numberOfPeopleToHire,
                jobUrl:action.payload.jobUrl,
                jobLocation:action.payload.jobLocation,
                reside:action.payload.reside,
                province:action.payload.province,
                jobType:action.payload.jobType,
                area:action.payload.area,
               
                status:action.payload.status,
               reportMessage:action.payload.reportMessage,
        }
        },
        deleteReport:(state,action)=>{
            const id = action.payload.id
            state.reports.filter((r)=>r.id!==id)
        }
    }
})
export const {addReport, getReport, updateReport,deleteReport}=reportSlice.actions
export default reportSlice.reducer