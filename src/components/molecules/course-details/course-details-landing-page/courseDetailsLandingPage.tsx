import HeadingAtom from '../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import { Rate } from 'antd';
import { useMediaQuery } from 'react-responsive';
import ButtonAtom from '../../../atoms/button/button.attom';
import { HeartOutlined } from '@ant-design/icons';
import './courseDetailsLandingPage.scss';
const CourseDetailsLandingPage = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  return (
    <main className="paid-course-landing-page__container ">
      <div className="dark-background">
        <div className="dark-background-inner-position-container">
          <div className="course-landing-page__main-content">
            <HeadingAtom
              style={{ color: 'white' }}
              text="The Complete 2023 Web Development Bootcamp"
              level={isTabletOrMobile ? 2 : 1}
            />
            <ParagraphAtom
              className={`color-white ${
                isTabletOrMobile ? 'text-18' : 'text-22'
              }`}
              text="Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps"
            ></ParagraphAtom>
            <div
              className="ratings mt-5 text-20 color-white"
              style={{ color: 'white' }}
            >
              {'4.5'}
              <Rate disabled defaultValue={4} />
              <span className="reviews color-white">{`(123,00)`}</span>
              <span>1,120,049 students</span>
            </div>
            <div className="course-landing-page__main-content_creator">
              <ParagraphAtom
                className="text-18 color-white mt-10"
                text="Created By Pallab Majumdar"
              ></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course-landing-page_sidebar-container">
          <div className="course-landing-page_sidebar-container_main_content">
            <img
              src="	https://img-c.udemycdn.com/course/750x422/2776760_f176_10.jpg"
              alt=""
              loading="lazy"
            />
            <div className="course-landing-page_sidebar-container_main_content_btn-group mt-20">
              <ButtonAtom
                text="Add To Cart"
                type="primary"
                size="large"
                style={{ width: '100%' }}
              ></ButtonAtom>
              <ButtonAtom
                icon={<HeartOutlined />}
                type="default"
                size="large"
                className="heart-icon"
                style={{ width: '4rem' }}
              ></ButtonAtom>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailsLandingPage;
