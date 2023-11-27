import { ADMIN, INSTRUCTOR } from "../../../constant/userType";
import { useAppSelector } from "../../../redux/store";
import ResultMolecules from "../../molecules/result/result.molecules";
const NotFoundPage = () => {
  const userType = useAppSelector((state) => state?.auth?.userData);

  const route =
    userType?.rank === ADMIN
      ? "/admin/course/published"
      : userType?.rank === INSTRUCTOR
      ? "/instructor/courses"
      : "/";
  return (
    <ResultMolecules
      status={"404"}
      title={"404"}
      subTitle={"Sorry, the page you visited does not exist."}
      link={route}
    ></ResultMolecules>
  );
};

export default NotFoundPage;
