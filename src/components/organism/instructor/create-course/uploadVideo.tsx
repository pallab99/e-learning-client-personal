import { Card, Progress, Space, Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import TextInputAtom from '../../../atoms/text-input/textInput.atom';
import './createCourse.scss';
import CenteredBtnOrganism from '../../../molecules/centered-btn/centered-btn.molecules';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import { SelectField } from '../../../atoms/select-filed/selectField';
import TextArea from 'antd/es/input/TextArea';
import InstructorDashboardSideBarOrganism from '../dashboard/sidebar/sidebar.organism';
import CourseApi from '../../../../api/CourseApi';
import apiConfigs from '../../../../api/apiConfigs';
import axios from 'axios';
import { useState } from 'react';
const { Dragger } = Upload;

const UploadCoursePromoVideo = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('file_to_upload', data.promoVideo.file);
    try {
      const res = await apiConfigs.http?.patch(
        '/course/upload/demoVideo/6554f0c725b550d271b1e012',
        formData,
        {
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            const remainingTimeInSeconds =
              progressEvent.total !== 0
                ? Math.floor(
                    (progressEvent.total - progressEvent.loaded) /
                      (progressEvent.loaded / progressEvent.total)
                  )
                : 0;
            const remainingTimeInMinutes = Math.ceil(
              remainingTimeInSeconds / 60
            );

            setUploadProgress(percentCompleted);
            setRemainingTime(remainingTimeInMinutes);
          },
        }
      );
      console.log(res?.data);
    } catch (error: any) {
      console.log(error?.response?.message);
    }
  };

  return (
    <div className="create-course-wrapper">
      <InstructorDashboardSideBarOrganism></InstructorDashboardSideBarOrganism>
      <div className="create-course-form mb-40 mt-40">
        <Card headStyle={{ fontSize: '30px' }} title="Create a new course">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <div className="input-group">
                <ParagraphAtom text="Select a appropriate thumbnail for this course" />
                <Controller
                  name="promoVideo"
                  control={control}
                  render={({ field }) => (
                    <Dragger
                      {...field}
                      listType="picture"
                      beforeUpload={() => {
                        return false;
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <img
                          src="https://s.udemycdn.com/course/750x422/placeholder.jpg"
                          alt=""
                        />
                      </p>
                      <ParagraphAtom
                        text="Click or drag the thumbnail to this area to upload"
                        className="ant-upload-text"
                      ></ParagraphAtom>
                    </Dragger>
                  )}
                />
                <ParagraphAtom
                  type="secondary"
                  text="Select a thumbnail which will grab the learners attention"
                  className="mt-20 text-15"
                />
              </div>
              {uploadProgress !== 0 && (
                <Progress percent={uploadProgress}></Progress>
              )}
              {remainingTime !== 0 && (
                <p>Remaining time: {remainingTime} minutes</p>
              )}
              <CenteredBtnOrganism
                justify="center"
                text="Create Course"
                type="primary"
                htmlType="submit"
                size="large"
              />
            </Space>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UploadCoursePromoVideo;
