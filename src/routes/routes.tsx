import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NotFoundPage from '../components/pages/404/404.pages';
import AllPublishedCoursePage from '../components/pages/admin/course/published/publishedCourse';
import AllSubscriptionListPage from '../components/pages/admin/subscriptionList/subscriptionList';
import AllAdminPage from '../components/pages/admin/user/admin/admin';
import AllInstructorPage from '../components/pages/admin/user/instructor/instrctor';
import AllStudentPage from '../components/pages/admin/user/student/students';
import ForgetPasswordPage from '../components/pages/forget-password/forgetPassword.pages';
import HeaderFooterLayout from '../components/pages/header-footer-layout/headerFooterLayout';
import HomePage from '../components/pages/home/home';
import CreateCoursePage from '../components/pages/instructors/course/create-course/createCourse';
import UpdateCoursePage from '../components/pages/instructors/course/update-course/updateCourse';
import InstructorDashboardPage from '../components/pages/instructors/dashboard/dashboard.page';
import ProfilePage from '../components/pages/profile/profile';
import ProfilePicturePage from '../components/pages/profile/profilePicture';
import SignInPage from '../components/pages/signIn/signIn.pages';
import SignUPPage from '../components/pages/signUp/signIp.pages';
import UnauthorizedPage from '../components/pages/unauthorized/unauthorized';
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

        <Route
          path="/"
          element={
            <HeaderFooterLayout>
              <HomePage />
            </HeaderFooterLayout>
          }
        />

        <Route
          path="/log-in"
          element={
            <HeaderFooterLayout>
              <SignInPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <HeaderFooterLayout>
              <SignUPPage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/forget-password/:resetToken/:userId"
          element={<ForgetPasswordPage />}
        />
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
          path="/instructor/course/landing-page/:courseId"
          element={
            <HeaderFooterLayout>
              <UpdateCoursePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/instructor/course/section/:courseId"
          element={
            <HeaderFooterLayout>
              <UpdateCoursePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/instructor/course/update/:courseId"
          element={
            <HeaderFooterLayout>
              <UpdateCoursePage />
            </HeaderFooterLayout>
          }
        />
        <Route
          path="/instructor/course/content/:courseId"
          element={
            <HeaderFooterLayout>
              <UpdateCoursePage />
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
          path="/admin/subscription/all"
          element={
            <HeaderFooterLayout>
              <AllSubscriptionListPage />
            </HeaderFooterLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
