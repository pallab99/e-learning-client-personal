import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN, INSTRUCTOR, STUDENT } from "../../../constant/userType";
import { useAppSelector } from "../../../redux/store";
import SignInFormOrganism from "../../organism/sign-in-form/signInForm.organism";

const SignInPage = () => {
  const loggedIn = useAppSelector((state) => state?.auth?.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && loggedIn.accessToken) {
      if (loggedIn.rank === STUDENT) {
        navigate("/");
      } else if (loggedIn.rank === INSTRUCTOR) {
        navigate("/instructor/courses");
      } else if (loggedIn.rank === ADMIN) {
        navigate("/admin/course/published");
      }
    }
  }, [loggedIn, navigate]);
  return <SignInFormOrganism></SignInFormOrganism>;
};

export default SignInPage;
