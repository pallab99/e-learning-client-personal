import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { INSTRUCTOR } from "../../../constant/userType";
import { useAppSelector } from "../../../redux/store";

const InstructorProtectedRoutePage = () => {
  console.log("gggg");
  const token = Cookies.get("accessToken");
  console.log("token", token);
  const instructor = useAppSelector((state) => state.auth.userData.rank);
  if (!token) {
    return <Navigate to="/log-in" />;
  }

  return instructor === INSTRUCTOR ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default InstructorProtectedRoutePage;
