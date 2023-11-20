import { HeartOutlined } from '@ant-design/icons';
import { Rate, message } from 'antd';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import CartApi from '../../../../api/CartApi';
import { STUDENT } from '../../../../constant/userType';
import { recallCartApi } from '../../../../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import ButtonAtom from '../../../atoms/button/button.attom';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import './courseDetailsLandingPage.scss';
const CourseDetailsLandingPage = ({ courseBasicInfo }: any) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  console.log('courseBasicInfo', courseBasicInfo?.data);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const handleAddToCart = async () => {
    try {
      console.log('courseId', courseId);

      setLoading(true);
      const res = await CartApi.addToCart(courseId);
      message.success(res?.data?.message);

      setLoading(false);
      dispatch(recallCartApi());
    } catch (error: any) {
      message.error(error?.response?.message);
      setLoading(false);
    }
  };
  const isStudent = useAppSelector((state) => state.auth.userData.rank);
  return (
    <main className="paid-course-landing-page__container ">
      <div className="dark-background">
        <div className="dark-background-inner-position-container">
          <div className="course-landing-page__main-content">
            <HeadingAtom
              style={{ color: 'white' }}
              text={courseBasicInfo && courseBasicInfo?.data?.title}
              level={isTabletOrMobile ? 2 : 1}
            />
            <ParagraphAtom
              className={`color-white ${
                isTabletOrMobile ? 'text-18' : 'text-22'
              }`}
              text={courseBasicInfo && courseBasicInfo?.data?.sub_title}
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
                text={`Created By ${
                  courseBasicInfo && courseBasicInfo?.data?.instructors[0]?.name
                }`}
              ></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course-landing-page_sidebar-container">
          <div className="course-landing-page_sidebar-container_main_content">
            <ReactPlayer
              url={courseBasicInfo?.data?.demoVideo}
              controls
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              onContextMenu={(e) => e.preventDefault()}
            />
            {isStudent === STUDENT && (
              <div className="course-landing-page_sidebar-container_main_content_btn-group mt-20">
                <ButtonAtom
                  text="Add To Cart"
                  type="primary"
                  size="large"
                  style={{ width: '100%' }}
                  handleButtonClick={handleAddToCart}
                ></ButtonAtom>
                <ButtonAtom
                  icon={<HeartOutlined />}
                  type="default"
                  size="large"
                  className="heart-icon"
                  style={{ width: '4rem' }}
                ></ButtonAtom>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailsLandingPage;
