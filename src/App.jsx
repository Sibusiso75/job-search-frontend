import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './Components/Admin/User'
import EditJob from './Components/Admin/EditJob'
import EditArticle from './Components/Admin/EditArticle'
import AdminLogin from './Components/Admin/AdminLogin'
import HomeNav from './Components/Frontend/JobSeeker/Home/HomeNav'
import ProfileEditUser from './Components/Frontend/JobSeeker/Home/ProfileEditUser'
import MyJobs from './Components/Frontend/JobSeeker/Home/MyJobs'
import SingleArticle from './Components/Frontend/JobSeeker/Home/SingleArticle'
import Note from './Note'
import ResetPassword from './Components/Frontend/JobSeeker/Auth/ResetPassword'
import Home from './Components/Frontend/JobSeeker/Home/Home'
import Login from './Components/Frontend/JobSeeker/Auth/Login'
import SignUp from './Components/Frontend/JobSeeker/Auth/SignUp'
import EmailVerification from './Components/Frontend/JobSeeker/Auth/EmailVerification'
import Job from './Components/Frontend/JobSeeker/Job'
import ForgotPassword from './Components/Frontend/JobSeeker/Auth/ForgotPassword'
import AddArticle from './Components/Admin/AddArticle'
import AddJob from './Components/Admin/AddJob'
import Users from './Components/Admin/Users'
import Reports from './Components/Admin/Reports'
import Admin from './Components/Admin/Admin'
import AllJobs from './Components/Admin/AllJobs'
import Article from './Components/Frontend/JobSeeker/Home/Article'
import AllArticles from './Components/Admin/AllArticles'
import MyReports from './Components/Frontend/JobSeeker/Home/MyReports'
import EditReport from './Components/Admin/EditReport'
import AddFeedback from './Components/Frontend/JobSeeker/Home/AddFeedback'
import AllFeedbacks from './Components/Admin/AllFeedbacks'
import AddEducation from './Components/Frontend/JobSeeker/Home/AddEducation'
import AddWork from './Components/Frontend/JobSeeker/Home/AddWork'
import Profile from './Components/Frontend/JobSeeker/Home/Profile'
import AddSkills from './Components/Frontend/JobSeeker/Home/AddSkills'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/info" element={<Note />}></Route>
        <Route path="/users/:id/verify/:token" element={<EmailVerification />}></Route>
        <Route path="/job/:id" element={<Job />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/sidebar" element={<HomeNav />}></Route>

        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/profileEditUser/:id" element={<ProfileEditUser />}></Route>

        <Route path="/education/:id" element={<AddEducation />}></Route>
        <Route path="/workHistory/:id" element={<AddWork />}></Route>
        <Route path="/skills/:id" element={<AddSkills />}></Route>



        <Route path="/feedback/:id" element={<AddFeedback />}></Route>

        <Route path="/admin/feedbacks" element={<AllFeedbacks />}></Route>



        <Route path="/savedJobs/:id" element={<MyJobs />}></Route>
        <Route path="/editReport/:id" element={<EditReport />}></Route>

        <Route path="/myReports/:id" element={<MyReports />}></Route>

        <Route path="/singleArticle/:id" element={<SingleArticle />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/posts" element={<Article />}></Route>
        <Route path="/editArticle/:id" element={<EditArticle />}></Route>
        <Route path="/admin/dashboard" element={<Admin />}></Route>
        <Route path="/editJob/:id" element={<EditJob />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route path="/admin/addArticle" element={<AddArticle />}></Route>
        <Route path="/admin/articles" element={<AllArticles />}></Route>
        <Route path="/admin/addJob" element={<AddJob />}></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/admin/reports" element={<Reports />}></Route>
        <Route path="/admin/jobs" element={<AllJobs />}></Route>
        <Route path="*" element={<h2>404 - Page not found</h2>}></Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App
