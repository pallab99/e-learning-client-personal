//@ts-nocheck

import { EllipsisOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Popconfirm,
  Popover,
  Rate,
  message,
} from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import reviewApi from "../../../api/reviewApi";
import useGetAllReviewByCourse from "../../../hooks/review-rating/useGetAllReviewByCourse";
import { useAppSelector } from "../../../redux/store";
import ButtonAtom from "../../atoms/button/button.attom";
import CourseCardSkeleton from "../../atoms/courseCardSkeleton/courseCardSkeleton";
import HeadingAtom from "../../atoms/heading/heading.atom";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
import AddReviewModal from "./add-review-modal/addReviewModal";
import "./courseReview.scss";
import UpdateReviewModal from "./update-review-modal/updateReview";
const CourseReview = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [updateReviewData, setUpdateReviewData] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (
    reviewId: string,
    rating: number,
    reviewMessage: string
  ) => {
    const data = {
      reviewId,
      rating,
      reviewMessage,
    };
    setUpdateReviewData(data);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const { courseId } = useParams();
  const [recallApi, setRecallApi] = useState(0);
  const { data, loading } = useGetAllReviewByCourse(
    courseId as string,
    recallApi
  );

  const [deleteReviewLoading, setDeleteReviewLoading] = useState(false);
  const handleDeleteReview = async (reviewId: string) => {
    try {
      setDeleteReviewLoading(true);
      const res = await reviewApi.deleteReview(courseId as string, reviewId);
      message.success(res?.data?.message);
      setDeleteReviewLoading(false);
      if (!deleteReviewLoading) {
        setRecallApi(Math.random());
      }
    } catch (error: any) {
      setDeleteReviewLoading(false);
      message.error(error?.response?.message);
    }
  };

  const userData = useAppSelector((state) => state?.auth.userData);
  return (
    <>
      <div className="course_review_main_Container">
        {loading ? (
          <CourseCardSkeleton></CourseCardSkeleton>
        ) : (
          <div>
            <div className="course_review_main_Container_header">
              <div className="course_review_header_rating">
                <Rate style={{ color: "#b4690e" }} count={1} value={1}></Rate>
                {data?.data ? (
                  <HeadingAtom
                    text={`${parseFloat(data?.data?.averageRating).toFixed(
                      2
                    )} course rating  *  ${data?.data?.data?.length} ratings`}
                    level={4}
                  />
                ) : (
                  <HeadingAtom
                    text={`0 course rating  *  0 ratings`}
                    level={4}
                  />
                )}
              </div>
              {userData.accessToken && (
                <ButtonAtom
                  text="Add Your Review"
                  type="primary"
                  handleButtonClick={handleOpenModal}
                />
              )}
            </div>
            <div className="course_review_contents_container">
              {data &&
                data?.data?.data?.map((review: any) => {
                  return (
                    <div
                      className="course_review_contents_container_items"
                      key={review?._id}
                    >
                      <Divider />
                      <div className="review_wrapper">
                        <div className="review-wrapper_div">
                          <div className="review_header">
                            <Avatar size={"large"} src={review?.user?.dp} />
                            <div className="user-name">
                              <HeadingAtom
                                text={review?.user?.name}
                                level={4}
                              ></HeadingAtom>
                              <div className="rating">
                                <Rate
                                  value={review?.rating}
                                  disabled
                                  style={{ color: "#b4690e", fontSize: "13px" }}
                                ></Rate>
                              </div>
                            </div>
                          </div>
                          {userData.email === review?.user?.email && (
                            <Popover
                              content={
                                <div className="cursor-pointer">
                                  <ButtonAtom
                                    type="text"
                                    text="Update"
                                    handleButtonClick={() =>
                                      handleOpenUpdateModal(
                                        review?._id,
                                        review?.rating,
                                        review?.reviewMessage
                                      )
                                    }
                                  ></ButtonAtom>
                                  <Popconfirm
                                    title="Are you sure?"
                                    onConfirm={() =>
                                      handleDeleteReview(review?._id)
                                    }
                                    okButtonProps={{
                                      loading: deleteReviewLoading,
                                    }}
                                  >
                                    <Button danger type="text">
                                      Delete
                                    </Button>
                                  </Popconfirm>
                                </div>
                              }
                              trigger="click"
                            >
                              <EllipsisOutlined
                                className="cursor-pointer"
                                style={{ fontSize: "30px" }}
                              />
                            </Popover>
                          )}
                          <UpdateReviewModal
                            openModal={openUpdateModal}
                            closeModal={handleCloseUpdateModal}
                            key={openUpdateModal}
                            reviewData={updateReviewData}
                            setRecallApi={setRecallApi}
                          ></UpdateReviewModal>
                        </div>
                        <div className="review_message mt-20">
                          <ParagraphAtom
                            text={review?.reviewMessage}
                          ></ParagraphAtom>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <AddReviewModal
              openModal={openModal}
              closeModal={handleCloseModal}
              key={openModal}
              setRecallApi={setRecallApi}
            ></AddReviewModal>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseReview;
