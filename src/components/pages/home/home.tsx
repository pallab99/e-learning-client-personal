import CourseCardMolecules from '../../molecules/course-card/courseCard';
import './home.scss';
import OnboardingSteps from './../../../components/user-onbording/userOnbording';
const HomePage = () => {
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
      <div className="tour_button_div">
        <OnboardingSteps />
      </div>

      <CourseCardMolecules />
    </div>
  );
};
export default HomePage;
