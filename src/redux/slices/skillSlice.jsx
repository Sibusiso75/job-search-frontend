import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
    name:"skills",
    initialState:{
        skills:[],
    },

    reducers:{
        addSkill:(state, action)=>{
           state.skills.push(action.payload)
        },
        getSkill:(state, action)=>{
         state.skills = action.payload.map(skill=>{
            return {id:skill._id,skillName:skill.skillName,
                skillLevel:skill.skillLevel,
                username:skill.username,
                userId:skill.userId
                            
            }
        })
        },
        
        updateSkill:(state, action)=>{
            const index = state.skills.findIndex(skill=>skill.id==action.payload.id)
            state.skills[index]={
                
                id:action.payload.id,skillName:action.payload.skillName,
                username:action.payload.username  
            }
        },
        deleteSkill:(state, action)=>{
            state.skills.filter((s)=>s.id!==action.payload.id)
        }
    }
})

export const {addSkill, getSkill,updateSkill, deleteSkill}=skillSlice.actions
export default skillSlice.reducer