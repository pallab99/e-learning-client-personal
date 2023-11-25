// import { searchTerm } from '../../../signals/course';
import { useAppSelector } from '../../../redux/store';
import Brand from '../../molecules/brand-card/brandCard';
import CourseCardMolecules from '../../molecules/course-card/courseCard';
import CourseRecommendation from '../../molecules/course-card/recomendation';
import './home.scss';

const HomePage = () => {
  const courseSearchTerm = useAppSelector((state) => state.course.searchTerm);

  return (
    <div className="pageWrapper">
      <div className="Banner">
        <div className="content">
          <img
            width="1340"
            height="400"
            alt=""
            src="https://img-b.udemycdn.com/notices/web_carousel_slide/image/8a209063-821d-430b-82f2-7fc3600d67f5.jpg"
            loading="eager"
          />
        </div>
      </div>
      <CourseCardMolecules />
    </div>
  );
};
export default HomePage;
