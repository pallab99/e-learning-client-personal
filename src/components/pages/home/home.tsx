import CourseCardMolecules from '../../molecules/course-card/courseCard';
import './home.scss';
import OnboardingSteps from './../../../components/user-onbording/userOnbording';
import { useAppSelector } from '../../../redux/store';
import { ADMIN, INSTRUCTOR, STUDENT } from '../../../constant/userType';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const HomePage = () => {
  const userData = useAppSelector((state) => state?.auth.userData);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userData && userData.accessToken) {
      if (userData.rank === STUDENT) {
        navigate('/');
      } else if (userData.rank === INSTRUCTOR) {
        navigate('/instructor/courses');
      } else if (userData.rank === ADMIN) {
        navigate('/admin/course/published');
      }
    }
  }, [userData, navigate]);
  return (
    <div className="pageWrapper">
      <div className="Banner">
        <div className="content">
          <img
            width="1340"
            height="400"
            alt=""
            src="	https://img-c.udemycdn.com/notices/web_carousel_slide/image/cda48665-0e6b-44a4-bd7f-95a869c815f8.jpg"
            loading="eager"
          />
        </div>
      </div>
      {userData && userData.rank === STUDENT && (
        <div className="tour_button_div">
          <OnboardingSteps />
        </div>
      )}

      <CourseCardMolecules />
    </div>
  );
};
export default HomePage;
