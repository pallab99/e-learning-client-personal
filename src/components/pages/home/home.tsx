import { Card } from 'antd';
import Brand from '../../molecules/brand-card/brandCard';
import './home.scss';
import CourseCardMolecules from '../../molecules/course-card/courseCard';

const HomePage = () => {
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
      <Brand />
      <CourseCardMolecules />
    </div>
  );
};
export default HomePage;
