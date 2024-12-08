import {lazy,Suspense,useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './Components/Admin/User'
import EditJob from './Components/Admin/EditJob'
import EditArticle from './Components/Admin/EditArticle'
import JoinOption from './Components/Frontend/JoinOption'
import EmployerLogin from './Components/Frontend/Employer/EmplAuth.jsx/EmployerLogin'
import Employers from './Components/Admin/Employers'
import EmployerSignUp from './Components/Frontend/Employer/EmplAuth.jsx/EmployerSignUp'
import Employer from './Components/Admin/Employer'
import AdminLogin from './Components/Admin/AdminLogin'
import HomeNav from './Components/Frontend/JobSeeker/Home/HomeNav'
// import EditUser from './Components/Admin/EditUser'
import ProfileEditUser from './Components/Frontend/JobSeeker/Home/ProfileEditUser'
// import EmployerHome from './Components/Frontend/Employer/EmplHome/EmployerHome'
// import EmployerProfile from './Components/Frontend/Employer/EmplHome/EmployerProfile'
// import EmployerEdit from './Components/Frontend/Employer/EmplHome/EmployerEdit'
// import EmployerArticle from './Components/Frontend/Employer/EmplHome/EmployerArticle'
// import EmployerJobs from './Components/Frontend/Employer/EmplHome/EmployerJobs'
// import EmpAddJob from './Components/Frontend/Employer/EmplHome/EmpAddJob'
// import EmpEditJob from './Components/Frontend/Employer/EmplHome/EmpEditJob'
// import Education from './Components/Frontend/JobSeeker/Home/Education'
// import PersonalDe from './Components/Frontend/JobSeeker/Home/PersonalDe'
// import WorkHistory from './Components/Frontend/JobSeeker/Home/WorkHistory'
import MyJobs from './Components/Frontend/JobSeeker/Home/MyJobs'
import SingleArticle from './Components/Frontend/JobSeeker/Home/SingleArticle'
import Note from './Note'
import axios from "axios"
// import ProfileView from './Components/Frontend/Employer/EmplHome/ProfileView'
import ResetPassword from './Components/Frontend/JobSeeker/Auth/ResetPassword'
const Home = lazy(()=>import('./Components/Frontend/JobSeeker/Home/Home'))
const Login=  lazy(()=>import('./Components/Frontend/JobSeeker/Auth/Login'))
const SignUp= lazy(()=>import('./Components/Frontend/JobSeeker/Auth/SignUp'))
const EmailVerification= lazy(()=>import('./Components/Frontend/JobSeeker/Auth/EmailVerification'))
const Job= lazy(()=>import('./Components/Frontend/JobSeeker/Job'))
const ForgotPassword= lazy(()=>import('./Components/Frontend/JobSeeker/Auth/ForgotPassword'))
const AddArticle = lazy(()=>import('./Components/Admin/AddArticle'))
const AddJob =lazy(()=>import('./Components/Admin/AddJob'))
const Users= lazy(()=>import( './Components/Admin/Users'))
const Reports =lazy(()=>import('./Components/Admin/Reports'))
const Admin=  lazy(()=>import( './Components/Admin/Admin'))
const AllJobs= lazy(()=>import( './Components/Admin/AllJobs'))
const Article= lazy(()=>import( './Components/Frontend/JobSeeker/Home/Article'))

import ReactLoading from 'react-loading';
import AllArticles from './Components/Admin/AllArticles'
import MyReports from './Components/Frontend/JobSeeker/Home/MyReports'
import EditReport from './Components/Admin/EditReport'
import Feedback from './Components/Frontend/JobSeeker/Home/Feedback'
import EducationalBackground from './Components/Frontend/JobSeeker/Home/EducationalBackground'
import WorkHistory from './Components/Frontend/JobSeeker/Home/WorkHistory'
import AddFeedback from './Components/Frontend/JobSeeker/Home/AddFeedback'
import AllFeedbacks from './Components/Admin/AllFeedbacks'
import AddEducation from './Components/Frontend/JobSeeker/Home/AddEducation'
import AddWork from './Components/Frontend/JobSeeker/Home/AddWork'
import { userLoggedIn } from './redux/slices/userslice'
import { useSelector,useDispatch } from 'react-redux'
import PersonalDetails from './Components/Frontend/JobSeeker/Home/PersonalDetails'
import Profile from './Components/Frontend/JobSeeker/Home/Profile'

function App(){
 const loggedIn = useSelector(state=>state.users.users)
 const dispatch = useDispatch()

  useEffect(()=>{
    axios.get("http://localhost:5000/verify")
    .then(res=>{
     if(res.data.status){
       dispatch(userLoggedIn(res.data.status))
     }
     
    })
   },[])
  return ( 
    <BrowserRouter>
  

      <Suspense fallback={<ReactLoading type={"spinningBubbles"} color={"blue"} height={667} width={375} />}>
     
     <Routes>
      <Route path="/" element={<Home/>}></Route>  
      
      <Route path="/info" element={<Note/>}></Route>  
      <Route path="/users/:id/verify/:token" element={<EmailVerification/>}></Route>
      <Route path="/job/:id" element={<Job/>}></Route>    
      <Route path="/register" element={<SignUp/>}></Route> 
      <Route path="/sidebar" element={<HomeNav/>}></Route>  
      {/* <Route path="/employerProfile/:id" element={<EmployerProfile/>}></Route>          */}
       {/* <Route path="/employerProfile/:id/editEmployer/:id" element={<EmployerEdit/>}></Route>          */}
      {/* <Route path="/employerJobs/:id" element={<EmployerJobs/>}></Route>             */}
       {/* <Route path="/employerJobs/:id/editJob/:id" element={<EmpEditJob/>}></Route>          */}
      {/* <Route path="/profile/:id/editUser/:id" element={<ProfileEditUser/>}></Route>          */}
      {/* <Route path="/editUser/:id" element={<EditUser/>}></Route>   */}
      <Route path={loggedIn?"/profile/:id":"/login"} element={<Profile/>}></Route>  
      <Route path={loggedIn?"/profileEditUser/:id":"/login"} element={<ProfileEditUser/>}></Route>  

      <Route path={loggedIn?"/education/:id":"/login"} element={<AddEducation/>}></Route>
      <Route path={loggedIn?"/workHistory/:id":"/login"} element={<AddWork/>}></Route>



      <Route path="/feedback/:id" element={<AddFeedback/>}></Route>   

      <Route path="/admin/feedbacks" element={<AllFeedbacks/>}></Route>   


 
      {/* <Route path="/profileView/:id" element={<ProfileView/>}></Route>          */}
    
      {/* <Route path="/profile/:id/education/:id" element={<Education/>}></Route>          */}
      <Route path="/savedJobs/:id" element={<MyJobs/>}></Route> 
      <Route path="/editReport/:id" element={<EditReport/>}></Route>         

      <Route path="/myReports/:id" element={<MyReports/>}></Route>         
    
      {/* <Route path="/profile/:id/workHistory/:id" element={<WorkHistory/>}></Route>          */}
      <Route path="/singleArticle/:id" element={<SingleArticle/>}></Route>      
      {/* <Route path="/join" element={<JoinOption/>}></Route>       */}
      <Route path="/login" element={<Login/>}></Route> 
      {/* <Route path="/employerHome" element={<EmployerHome/>}></Route>   */}
      <Route path="/employers" element={<Employers/>}></Route> 
      {/* <Route path="/addJob" element={<EmpAddJob/>}></Route>             */}
      <Route path="/employerLogin" element={<EmployerLogin/>}></Route>         
      <Route path="/employerSignUp" element={<EmployerSignUp/>}></Route> 
      <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>  
      <Route path="/resetPassword/:token" element={<ResetPassword/>}></Route>      
      <Route path="/posts" element={<Article/>}></Route>
      {/* <Route path="/employerArticles" element={<EmployerArticle/>}></Route> */}
      <Route path="/editArticle/:id" element={<EditArticle/>}></Route>
      <Route path="/admin/dashboard" element={<Admin/>}></Route>
      <Route path="/editJob/:id" element={<EditJob/>}></Route>
      <Route path="/user/:id" element={<User/>}></Route>
      <Route path="/admin" element={<AdminLogin/>}></Route>
      {/* <Route path="/employer/:id" element={<Employer/>}></Route> */}
      <Route path="/admin/addArticle" element={<AddArticle/>}></Route>
      <Route path="/admin/articles" element={<AllArticles/>}></Route>    
      <Route path="/admin/addJob" element={<AddJob/>}></Route>     
      <Route path="/admin/users" element={<Users/>}></Route>   
      <Route path="/admin/reports" element={<Reports/>}></Route>         
      <Route path="/admin/jobs" element={<AllJobs/>}></Route>      
      <Route path="*" element={<h2>404 - Page not found</h2>}></Route>
</Routes>
      
      </Suspense>
     
    </BrowserRouter>
  )
}

export default App
   