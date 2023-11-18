import React from 'react';
import './courseReview.scss';
import { Avatar, Divider, Rate } from 'antd';
import HeadingAtom from '../../atoms/heading/heading.atom';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import { EllipsisOutlined } from '@ant-design/icons';
import ButtonAtom from '../../atoms/button/button.attom';
import AddReviewModal from './add-review-modal/addReviewModal';
const CourseReview = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="course_review_main_Container">
      <div className="course_review_main_Container_header">
        <div className="course_review_header_rating">
          <Rate style={{ color: '#b4690e' }} count={1} value={1}></Rate>
          <HeadingAtom text="4.7 course rating 337K ratings" level={4} />
        </div>
        <ButtonAtom
          text="Add Your Review"
          type="primary"
          handleButtonClick={handleOpenModal}
        />
      </div>
      <div className="course_review_contents_container">
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
        <div className="course_review_contents_container_items">
          <Divider />
          <div className="review_wrapper">
            <div className="review-wrapper_div">
              <div className="review_header">
                <Avatar
                  size={'large'}
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
                <div className="user-name">
                  <HeadingAtom text={'Pallab Majumdar'} level={5}></HeadingAtom>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: '#b4690e', fontSize: '13px' }}
                    ></Rate>
                    <span>{'a month ago'}</span>
                  </div>
                </div>
              </div>
              <EllipsisOutlined
                className="cursor-pointer"
                style={{ fontSize: '30px' }}
              />
            </div>
            <div className="review_message mt-20">
              <ParagraphAtom text="Yes, it was. For me, its a whole package for diving into the exciting journey of full- stack web development."></ParagraphAtom>
            </div>
          </div>
        </div>
      </div>
      <AddReviewModal
        openModal={openModal}
        closeModal={handleCloseModal}
      ></AddReviewModal>
    </div>
  );
};

export default CourseReview;
