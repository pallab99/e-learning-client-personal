import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from '../components/pages/signIn/signIn.pages';
import SignUPPage from '../components/pages/signUp/signIp.pages';
import ForgetPasswordPage from '../components/pages/forget-password/forgetPassword.pages';
import NotFoundPage from '../components/pages/404/404.pages';
import UnauthorizedPage from '../components/pages/unauthorized/unauthorized';
import InstructorDashboardPage from '../components/pages/instructors/dashboard/dashboard.page';
import CreateCoursePage from '../components/pages/instructors/course/create-course/createCourse';
import UpdateCourseOrganism from '../components/organism/instructor/update-course/updateCourse';
import ProfilePage from '../components/pages/profile/profile';
import ProfilePicturePage from '../components/pages/profile/profilePicture';
import HomePage from '../components/pages/home/home';
import AllStudentPage from '../components/pages/admin/user/student/students';
import AllInstructorPage from '../components/pages/admin/user/instructor/instrctor';
import AllAdminPage from '../components/pages/admin/user/admin/admin';
import AllPublishedCoursePage from '../components/pages/admin/course/published/publishedCourse';
import AllPendingCoursePage from '../components/pages/admin/course/pending/pendingCourse';
import HeaderFooterLayout from '../components/pages/header-footer-layout/headerFooterLayout';
// import { lazy } from 'react';
// const ProfilePage=lazy("../components/pages/profile/profile")
const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/instructor/courses"
          element={
            <HeaderFooterLayout>
              <InstructorDashboardPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/"
          element={
            <HeaderFooterLayout>
              <HomePage />
            </HeaderFooterLayout>
          }
        />

        <Route path="/log-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUPPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route
          path="*"
          element={
            <HeaderFooterLayout>
              <NotFoundPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <HeaderFooterLayout>
              <UnauthorizedPage />
            </HeaderFooterLayout>
          }
        />

        <Route
          path="/instructor/course/create"
          element={
            <HeaderFooterLayout>
              <CreateCoursePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/instructor/course/update/:courseId"
          element={
            <HeaderFooterLayout>
              <UpdateCourseOrganism />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/profile/basic-information"
          element={
            <HeaderFooterLayout>
              <ProfilePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/profile/photo"
          element={
            <HeaderFooterLayout>
              <ProfilePicturePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/admin/user/student"
          element={
            <HeaderFooterLayout>
              <AllStudentPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/admin/user/instructor"
          element={
            <HeaderFooterLayout>
              <AllInstructorPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/admin/user/admin"
          element={
            <HeaderFooterLayout>
              <AllAdminPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/admin/course/published"
          element={
            <HeaderFooterLayout>
              <AllPublishedCoursePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/admin/course/pending"
          element={
            <HeaderFooterLayout>
              <AllPendingCoursePage />
            </HeaderFooterLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
