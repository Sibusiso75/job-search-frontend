import React, { useState, useEffect } from 'react'
import { BsSend } from 'react-icons/bs'
import { FaArrowCircleLeft, FaCommentAlt, FaRegWindowClose, FaRegThumbsUp, FaUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../../../redux/slices/userslice'
import { toast } from 'react-toastify'

function SingleArticle() {
  let { id } = useParams()
  let navigate = useNavigate()
  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles.articles)
  const article = articles.find(a => a.id == id)

const loggedIn = useSelector(state=>state.users.loggedIn)
  const [showDeleteComment, setShowDeleteComment] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await fetch("http://localhost:5000/users")
  //     const data = await res.json()
  //     dispatch(getUser(data))
  //   }
  //   fetchUser()
  // }, [])
  // function submitComment(e){
  //   e.preventDefault()
  //   toast.success("Commented successfully")
  // }
  return (
    <div>
      <div style={{ padding: showLikes ? "0px" : "10px" }}>
        <button onClick={() => navigate("/posts")}
          style={{ background: "gray", color: "whitesmoke", fontWeight: "bold" }}>
          <FaArrowCircleLeft />
        </button>
        <br />
        <div style={{ display: "flex", gap: "0.2rem" }
        }>
          <FaUserCircle style={{ borderRadius: "30px", fontSize: "30px" }} /><h5>{article.name}</h5> <p style={{ color: "gray" }}>{article.date}, {article.time}</p>
        </div>
        <p>{article.post}</p>
        {
          showLikes ? <div style={{ position: "absolute", background: "black", top: "-5px", color: "white", border: "1px solid black", padding: "20px", height: article.likes.length <= 8 ? "100vh" : "fit-content", width: "100%" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {article.likes.length === 0 ?
                "No one likes this post" :
                article.likes.length === 1 ?
                  article.likes.length + " person likes this post" : article.likes.length + " people like this post"}
              <FaRegWindowClose style={{ float: "right" }} onClick={() => setShowLikes(false)} />
            </div>
            <hr />
            <ol>
              {article.likes.map((like, index) => {
                return <div key={index} style={{ paddingBottom: "0.5%" }}>
                  <li>
                    <FaUserCircle /> {like.username} {like.username == article.name ? "(author)" : ""} <FaRegThumbsUp style={{ color: "darkblue" }} />
                  </li>
                  <hr />
                </div>
              })}
            </ol>
          </div>
            :
            <div onClick={() => setShowLikes(!showLikes)} style={{ display: "flex", gap: "0.5rem", flexDirection: "column", borderBottom: "1px solid gray", color: "gray", padding: "10px" }}>
              <span className='likes'>
                {
                  article.likes.length == 0 ?
                    <p style={{ color: "gray" }}>Be the first one to like this post</p>
                    :
                    article.likes.length == 1 ?
                      <span style={{ fontSize: "10px", border: "1px dotted gray", borderRadius: "30px", color: "darkblue", width: "fit-content", padding: "10px" }} onClick={() => navigate(`/singleArticle/${id}`)}>
                        <FaRegThumbsUp />
                        <span style={{ color: "gray" }}>{article.likes[0].username} likes this post</span>
                      </span>
                      : article.likes.length == 2 ?
                        <span style={{ color: "darkblue", width: "fit-content", padding: "10px" }} onClick={() => navigate(`/singleArticle/${id}`)}>
                          <FaRegThumbsUp /> <span style={{ color: "gray" }}>{article.likes[0].username} and {article.likes[1].username} like this post</span>
                        </span>
                        :
                        article.likes.length == 3 ?
                          <span style={{ color: "darkblue", width: "fit-content", padding: "10px" }} onClick={() => navigate(`/singleArticle/${id}`)}> <FaRegThumbsUp />
                            <span style={{ color: "gray" }}> {article.likes[0].username}, {article.likes[1].username} and {article.likes[2].username} like this post</span>
                          </span>
                          :
                          <span onClick={() => navigate(`/singleArticle/${id}`)}>
                            <FaRegThumbsUp style={{ color: "blue" }} /> <span style={{ color: "gray" }}>{article.likes[0].username}, {article.likes[1].username} and {article.likes.length - 2} others like this post</span>
                          </span>
                }
              </span>
              <span style={{ display: "flex", gap: "0.3rem" }}>
                <button style={{ padding: "10px", width: "100px", background: "white", borderRadius: "20px", border: "1px solid gray" }} >
                  <FaRegThumbsUp /> {article.likes.length}
                </button>
                <button style={{ border: "1px solid gray", width: "100px", background: "white", padding: "10px", borderRadius: "20px" }} >
                  <FaCommentAlt /> {article.comments.length}
                </button>
              </span>
            </div>
        }
      </div>
      {/* box-shadow:-1px 1px -2px 3px black;
    background: rgb(0,0,15);
    word-wrap: break-word;
    color:white;
    width:100%;
    padding:10px;
    padding-bottom: 100%; */}
      {
        !showLikes &&
        <div className='singleArticle'>
          {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="text" placeholder="write a comment" style={{ width: "fit-content", outline: "none", borderRadius: "10px", padding: "20px" }} />
            <button onClick={loggedIn?submitComment:()=>navigate("/login")}style={{ marginLeft: "2%", width: "fit-content", height: "40px", background: "teal" }}>Post comment</button>
          </div> */}
          <br />

          {
            article.comments.map((c) => {
              return <div key={c.id} className='comments'>
               <div>
               <FaUserCircle style={{fontSize: "30px" }} /> {c.username}
               {article.name == c.username ? "(author)" : ""} <p style={{ color: "gray" }}>
                        {c.date}, {c.time}
                      </p>
               </div>
                      
                      <p>{c.comment}</p>
                  
                {
                  showReplies === false ?
                    <div>
                      <p onClick={() => setShowReplies(!showReplies)} style={{ borderBottom: "2px solid white", width: "fit-content", fontWeight: "bold" }}>{c.replies.length === 1 ? `${c.replies.length} reply on ${c.username}'s comment` : `${c.replies.length} replies on ${c.username}'s comment`} </p>
                    </div>
                    :
                    <div>
                      <div style={{ display: "flex", height: "100vh", width: "100vh", gap: "0.2rem" }}>

                        <FaArrowCircleLeft style={{ fontSize: "20px" }} onClick={() => setShowReplies(!showReplies)} /><p style={{ fontWeight: "bold", borderBottom: "2px solid gray" }}>
                          replies on {c.username}'s comment
                        </p>
                      </div>
                      {
                        c.replies.map((r, index) => {
                          return <div key={index} style={{ display: "flex", height: "100vh", flexDirection: "column", borderRadius: "10px", padding: "20px", width: "100%" }}>
                            <div style={{ display: "flex", gap: "0.2rem" }}>
                              <FaUserCircle style={{ fontSize: "30px" }} />{r.username},
                              <p style={{ color: "gray" }}>
                                {r.date}, {r.time}
                              </p>
                            </div>
                            {r.reply}
                          </div>
                        })
                      }
                      <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
                        <input type="text" style={{ width: "fit-content" }} placeholder="write a reply" />
                        <button style={{ marginLeft: "10%", height: "100vh", width: "fit-content", color: "gray", background: "navy" }}>Send <BsSend /></button>
                      </div>
                    </div>
                }
              </div>
            })
          }
        </div>
      }
    </div>
  )
}

export default SingleArticle