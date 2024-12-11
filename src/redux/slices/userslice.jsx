import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        loggedIn:false,
    },

    reducers:{
        addUser:(state, action)=>{
           state.users.push(action.payload)
        },
    userLoggedIn:(state, action)=>{
        state.loggedIn=true
    },

        getUser:(state, action)=>{
         state.users = action.payload.map(user=>{
            return {id:user._id,username:user.username,
                email:user.email,
                dateOfBirth:user.dateOfBirth, gender:user.gender,
                town:user.town, postalCode:user.postalCode,
        //    aboutMe:user.aboutMe, 
        //  country:user.country,
        phoneNumber:user.phoneNumber,

           province:user.province,
           highestGradePassed:user.highestGradePassed,
                schoolName:user.schoolName,
                yearObtainedOne:user.yearObtainedOne,
                institutionName:user.institutionName,
                courseName:user.courseName,
                bio:user.bio,
                yearObtainedTwo:user.yearObtainedTwo,
                jobTitle:user.jobTitle,
                companyName:user.companyName,
                yearsOfExperience:user.yearsOfExperience,
                startDate:user.startDate,
                endDate:user.endDate
            }
        })
        },
        
       
        updateUser:(state, action)=>{
            const index = state.users.findIndex(user=>user.id==action.payload.id)
            state.users[index]={
                id:action.payload.id,username:action.payload.username,email:action.payload.email, isAdmin:action.payload.isAdmin
                ,dateOfBirth:action.payload.dateOfBirth, 
                gender:action.payload.gender,
                phoneNumber:action.payload.phoneNumber,
                postalCode:action.payload.postalCode,
                bio:action.payload.bio,
                town:action.payload.town, 
                // aboutMe:action.payload.aboutMe, 
                province:action.payload.province, 
                // country:action.payload.country,
                highestGradePassed:action.payload.highestGradePassed,
                schoolName:action.payload.schoolName,
                yearObtainedOne:action.payload.yearObtainedOne,
                institutionName:action.payload.institutionName,
                courseName:action.payload.courseName,
                yearObtainedTwo:action.payload.yearObtainedTwo,
                jobTitle:action.payload.jobTitle,
                companyName:action.payload.companyName,
                yearsOfExperience:action.payload.yearsOfExperience,
                startDate:action.payload.startDate,
                endDate:action.payload.endDate
            }
        },
        deleteUser:(state, action)=>{
            state.users.filter(user=>user.id!==action.payload.id)
        }
    }
})

export const {addUser, getUser,updateUser, deleteUser,userLoggedIn}=userSlice.actions
export default userSlice.reducer