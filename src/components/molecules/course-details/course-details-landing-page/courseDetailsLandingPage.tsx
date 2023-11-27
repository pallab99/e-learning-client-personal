import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import {
  Input,
  Modal,
  Progress,
  QRCode,
  Rate,
  Skeleton,
  Space,
  message,
} from "antd";
import copy from "copy-to-clipboard";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import CartApi from "../../../../api/CartApi";
import WishlistApi from "../../../../api/WishlistApi";
import { STUDENT } from "../../../../constant/userType";
import useGetStudentBoughtTheCourse from "../../../../hooks/course/useGetStudentBoughtTheCurse";
import useGetCourseAvailableInWishlistByUser from "../../../../hooks/wishlist/useGetCourseAvailableInWishlist";
import { recallCartApi } from "../../../../redux/slices/cartSlice";
import { recallWishListApi } from "../../../../redux/slices/wishListSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import QnAModal from "../../QNA/qna";
import "./courseDetailsLandingPage.scss";
const CourseDetailsLandingPage = ({ courseBasicInfo }: any) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  console.log("courseBasicInfo", courseBasicInfo?.data);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const { courseAvailableInUserWishlist, error } =
    useGetCourseAvailableInWishlistByUser(courseId as string);
  const { studentBoughtTheCourseData, userBoughtTheCourseLoader } =
    useGetStudentBoughtTheCourse(courseId as string);
  console.log({ studentBoughtTheCourseData });
  const userLoggedIn = useAppSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.auth.userData);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const handleAddToWishList = async () => {
    if (!userLoggedIn || userLoggedIn.rank !== STUDENT) {
      navigate("/log-in");
    } else {
      try {
        setWishlistLoading(true);
        let res;
        if (courseAvailableInUserWishlist) {
          res = await WishlistApi.removeCourseFromWishlist(courseId as string);
        } else {
          res = await WishlistApi.addCourseToTheWishlist(courseId as string);
        }
        dispatch(recallWishListApi());
        message.success(res?.data?.message);
        setWishlistLoading(false);
      } catch (error: any) {
        message.error(error?.response?.message);
        setWishlistLoading(false);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!userLoggedIn || userLoggedIn.rank !== STUDENT) {
      navigate("/log-in");
    } else {
      try {
        setLoading(true);
        const res = await CartApi.addToCart(courseId);
        message.success(res?.data?.message);
        setLoading(false);
        dispatch(recallCartApi());
      } catch (error: any) {
        message.error(error?.response?.message);
        setLoading(false);
      }
    }
  };
  const isStudent = useAppSelector((state) => state.auth.userData.rank);
  const [openQNAModal, setOPENQNAModal] = useState(false);
  const userProgress = useAppSelector((state) => state?.userProgress.progress);
  const showUserProgress = useAppSelector(
    (state) => state?.userProgress.boughtTheCourse
  );
  const [openShareCourseModal, setOpenShareCourseModal] = useState(false);
  const [courseURL, setCourseURL] = useState("");
  return (
    <main className="paid-course-landing-page__container ">
      <div className="dark-background">
        <div className="dark-background-inner-position-container">
          <div className="course-landing-page__main-content">
            <HeadingAtom
              style={{ color: "white" }}
              text={courseBasicInfo && courseBasicInfo?.data?.title}
              level={isTabletOrMobile ? 2 : 1}
            />
            <ParagraphAtom
              className={`color-white ${
                isTabletOrMobile ? "text-18" : "text-22"
              }`}
              text={courseBasicInfo && courseBasicInfo?.data?.sub_title}
            ></ParagraphAtom>
            <div
              className="ratings mt-5 text-20 color-white"
              style={{ color: "white" }}
            >
              {parseFloat(courseBasicInfo?.data?.rating).toFixed(2)}
              <Rate
                disabled
                defaultValue={parseFloat(courseBasicInfo?.data?.rating)}
                allowHalf
              />
              <span className="reviews color-white">{`(${courseBasicInfo?.data?.ratingCount} ratings)`}</span>
              <span>{`${courseBasicInfo?.data?.students?.length} students`}</span>
            </div>
            <div className="course-landing-page__main-content_creator">
              <ParagraphAtom
                className="text-18 color-white mt-10"
                text={`Created By ${
                  courseBasicInfo &&
                  courseBasicInfo?.data &&
                  courseBasicInfo?.data?.instructors &&
                  courseBasicInfo?.data?.instructors[0]?.name
                }`}
              ></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course-landing-page_sidebar-container">
          <div className="course-landing-page_sidebar-container_main_content">
            {courseBasicInfo?.data?.demoVideo ? (
              <ReactPlayer
                className="react_player_course_landing_page"
                url={courseBasicInfo?.data?.demoVideo}
                controls
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                onContextMenu={(e: { preventDefault: () => any }) =>
                  e.preventDefault()
                }
              />
            ) : (
              <img
                style={{ height: "100%" }}
                src="https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg"
              ></img>
            )}
            {userBoughtTheCourseLoader ? (
              <div className="course_details_button_skeleton mt-20">
                <Skeleton.Button active />
              </div>
            ) : Object.keys(studentBoughtTheCourseData).length > 0 ? (
              <div
                style={{ paddingLeft: "2%", paddingRight: "2%", width: "100%" }}
              >
                <div className="qna_share_button">
                  <ButtonAtom
                    text="Open QNA"
                    type="primary"
                    style={{ width: "100%" }}
                    size="large"
                    className="mt-20"
                    handleButtonClick={() => setOPENQNAModal(true)}
                  ></ButtonAtom>
                  <ButtonAtom
                    className="mt-20"
                    size="large"
                    icon={<ShareAltOutlined />}
                    handleButtonClick={() => {
                      setCourseURL(window.location.href);
                      setOpenShareCourseModal(true);
                    }}
                  ></ButtonAtom>
                </div>
                <div className="student-progress">
                  <ParagraphAtom
                    text="Your Progress"
                    className="mt-10"
                    strong={true}
                  ></ParagraphAtom>
                  <Progress
                    strokeLinecap="butt"
                    percent={Number(userProgress.toFixed(2))}
                    style={{ color: "white", borderRadius: "20px" }}
                    size={[300, 20]}
                  />
                </div>
                <QnAModal
                  openModal={openQNAModal}
                  closeModal={() => setOPENQNAModal(false)}
                ></QnAModal>
                <Modal
                  open={openShareCourseModal}
                  onCancel={() => {
                    setOpenShareCourseModal(false);
                  }}
                  footer={null}
                  centered
                >
                  <div className="share_course_div mt-30">
                    <QRCode value={courseURL} size={200} className="mb-20" />
                    <Space.Compact style={{ width: "100%" }}>
                      <Input defaultValue={courseURL} />
                      <ButtonAtom
                        text="Copy"
                        type="primary"
                        handleButtonClick={() => {
                          copy(courseURL);
                          message.success("Link copied");
                        }}
                        style={{ backgroundColor: "#1b1c1c" }}
                      ></ButtonAtom>
                    </Space.Compact>
                  </div>
                </Modal>
              </div>
            ) : (
              <div className="course-landing-page_sidebar-container_main_content_btn-group mt-20">
                <ButtonAtom
                  text="Add To Cart"
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  handleButtonClick={handleAddToCart}
                ></ButtonAtom>
                <ButtonAtom
                  icon={<HeartOutlined />}
                  type={
                    courseAvailableInUserWishlist && !error
                      ? "primary"
                      : "default"
                  }
                  size="large"
                  className="heart-icon"
                  style={{ width: "4rem" }}
                  handleButtonClick={handleAddToWishList}
                  loading={wishlistLoading}
                ></ButtonAtom>
              </div>
              // ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailsLandingPage;
