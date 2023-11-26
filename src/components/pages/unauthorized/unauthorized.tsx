import { ADMIN, INSTRUCTOR } from '../../../constant/userType';
import { useAppSelector } from '../../../redux/store';
import ResultMolecules from '../../molecules/result/result.molecules';

const UnauthorizedPage = () => {
  const userType = useAppSelector((state) => state?.auth?.userData);
  const route =
    userType?.rank === ADMIN
      ? '/admin/course/published'
      : userType?.rank === INSTRUCTOR
      ? '/instructor/courses'
      : '/';
  return (
    <ResultMolecules
      status={'403'}
      title={'403'}
      subTitle="Sorry, you are not authorized to access this page."
      link={route}
    />
  );
};

export default UnauthorizedPage;
