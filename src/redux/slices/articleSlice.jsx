import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name:"articles",
    initialState:{
        articles:[],
    },
    reducers:{
        addArticle:(state, action)=>{
           state.articles.push(action.payload)
        },
        getArticle:(state, action)=>{
         state.articles = action.payload.map(article=>{
            return {replies:article.replies,comments:article.comments,id:article.id,name:article.name, authorEmail:article.authorEmail,
            likes:article.likes,title:article.title,date:article.date,time:article.time,post:article.post}
        })
        },
        updateArticle:(state, action)=>{
            const index = state.articles.findIndex(article=>article.id===action.payload.id)
            state.articles[index]={
                id:id.articlerticle.id,authorName:article.authorName, email:article.email, isAdmin:article.isAdmin
            ,title:article.title,paragraph:article.paragraph,example:article.example
            }
        },
        deleteArticle:(state, action)=>{
            state.articles.filter(article=>article.id!==action.payload.id)
        }
    }
})
export const {addArticle, getArticle, updateArticle, deleteArticle}=articleSlice.actions
export default articleSlice.reducer