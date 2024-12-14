import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { lazy, Suspense } from "react"
import MyLoader from './MyLoader'
const User = lazy(() => import('./Components/Admin/User'))
const EditJob = lazy(() => import('./Components/Admin/EditJob'))
const EditArticle = lazy(() => import('./Components/Admin/EditArticle'))
const AdminLogin = lazy(() => import('./Components/Admin/AdminLogin'))
const HomeNav = lazy(() => import('./Components/Frontend/JobSeeker/Home/HomeNav'))
const ProfileEditUser = lazy(() => import('./Components/Frontend/JobSeeker/Home/ProfileEditUser'))
const MyJobs = lazy(() => import('./Components/Frontend/JobSeeker/Home/MyJobs'))
const SingleArticle = lazy(() => import('./Components/Frontend/JobSeeker/Home/SingleArticle'))
const Note = lazy(() => import('./Note'))
const ResetPassword = lazy(() => import('./Components/Frontend/JobSeeker/Auth/ResetPassword'))
const Home = lazy(() => import('./Components/Frontend/JobSeeker/Home/Home'))
const Login = lazy(() => import('./Components/Frontend/JobSeeker/Auth/Login'))
const SignUp = lazy(() => import('./Components/Frontend/JobSeeker/Auth/SignUp'))
const EmailVerification = lazy(() => import('./Components/Frontend/JobSeeker/Auth/EmailVerification'))
const Job = lazy(() => import('./Components/Frontend/JobSeeker/Job'))
const ForgotPassword = lazy(() => import('./Components/Frontend/JobSeeker/Auth/ForgotPassword'))
const AddArticle = lazy(() => import('./Components/Admin/AddArticle'))
const AddJob = lazy(() => import('./Components/Admin/AddJob'))
const Users = lazy(() => import('./Components/Admin/Users'))
const Reports = lazy(() => import('./Components/Admin/Reports'))
const Admin = lazy(() => import('./Components/Admin/Admin'))
const AllJobs = lazy(() => import('./Components/Admin/AllJobs'))
const Article = lazy(() => import('./Components/Frontend/JobSeeker/Home/Article'))
const AllArticles = lazy(() => import('./Components/Admin/AllArticles'))
const MyReports = lazy(() => import('./Components/Frontend/JobSeeker/Home/MyReports'))
const EditReport = lazy(() => import('./Components/Admin/EditReport'))
const AddFeedback = lazy(() => import('./Components/Frontend/JobSeeker/Home/AddFeedback'))
const AllFeedbacks = lazy(() => import('./Components/Admin/AllFeedbacks'))
const AddEducation = lazy(() => import('./Components/Frontend/JobSeeker/Home/AddEducation'))
const AddWork = lazy(() => import('./Components/Frontend/JobSeeker/Home/AddWork'))
const Profile = lazy(() => import('./Components/Frontend/JobSeeker/Home/Profile'))
const AddSkills = lazy(() => import('./Components/Frontend/JobSeeker/Home/AddSkills'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<MyLoader />}>
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
