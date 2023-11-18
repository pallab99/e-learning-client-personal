import { Card } from 'antd';
import React from 'react';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import './whatYouWillLearn.scss';
import { CheckOutlined } from '@ant-design/icons';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
const WhatYouWillLearn = () => {
  return (
    <div className="course_details_what_you_will_learn_main_container mt-20 mb-30">
      <Card>
        <HeadingAtom text="What youll learn" level={2}></HeadingAtom>
        <div className="course_details_what_you_will_learn_container_two_column_layout">
          <div className="course_details_what_you_will_learn_container_column1">
            <div className="course_details_what_you_will_learn_container_column1_content">
              <div className="course_details_what_you_will_learn_container_column1_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
            <div className="course_details_what_you_will_learn_container_column1_content">
              <div className="course_details_what_you_will_learn_container_column1_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
            <div className="course_details_what_you_will_learn_container_column1_content">
              <div className="course_details_what_you_will_learn_container_column1_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
            <div className="course_details_what_you_will_learn_container_column1_content">
              <div className="course_details_what_you_will_learn_container_column1_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
          </div>

          <div className="course_details_what_you_will_learn_container_column2">
            <div className="course_details_what_you_will_learn_container_column2_content">
              <div className="course_details_what_you_will_learn_container_column2_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
            <div className="course_details_what_you_will_learn_container_column2_content">
              <div className="course_details_what_you_will_learn_container_column2_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
            <div className="course_details_what_you_will_learn_container_column2_content">
              <div className="course_details_what_you_will_learn_container_column2_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
            <div className="course_details_what_you_will_learn_container_column2_content">
              <div className="course_details_what_you_will_learn_container_column2_content_list">
                <CheckOutlined />
                <ParagraphAtom text=" Build 16 web development projects for your portfolio, ready to apply for junior developer jobs."></ParagraphAtom>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WhatYouWillLearn;
