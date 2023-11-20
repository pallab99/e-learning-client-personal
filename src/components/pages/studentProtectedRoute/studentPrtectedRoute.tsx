import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { STUDENT } from "../../../constant/userType";
import { useAppSelector } from "../../../redux/store";

const StudentProtectedRoutePage = () => {
  console.log("gggg");
  const token = Cookies.get("accessToken");
  console.log("token", token);
  const student = useAppSelector((state) => state.auth.userData.rank);
  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  return student === STUDENT ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default StudentProtectedRoutePage;
