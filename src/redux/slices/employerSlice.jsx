import { createSlice } from "@reduxjs/toolkit";

const employerSlice = createSlice({
    name:"employers",
    initialState:{
        employers:[],
        loggedIn:false
    },
    reducers:{
        addEmployer:(state, action)=>{
           state.employers.push(action.payload)
        },
        getEmployer:(state, action)=>{
         state.employers = action.payload.map(employer=>{
            return {id:employer._id,username:employer.username, email:employer.email,
                 password:employer.password,phoneNumber:employer.phoneNumber,
                 companyName:employer.companyName,numberOfEmployees:employer.numberOfEmployees,
                 aboutYourCompany:employer.aboutYourCompany }
        })
        },
        updateEmployer:(state, action)=>{
            const index = state.employers.findIndex(employer=>employer.id===action.payload.id)
            state.employers[index]={
                id:employer._id,username:employer.username, email:employer.email,
                password:employer.password,phoneNumber:employer.phoneNumber,
                companyName:employer.companyName,numberOfEmployees:employer.numberOfEmployees,
                aboutYourCompany:employer.aboutYourCompany}
        },
        deleteEmployer:(state, action)=>{
            state.employers.filter(employer=>employer._id!==action.payload.id)
        }
    }
})
export const {addEmployer, getEmployer, updateEmployer, deleteEmployer,loggedIn}=employerSlice.actions
export default employerSlice.reducer