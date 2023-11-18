import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Image, Progress, Space, Upload, message } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import apiConfigs from '../../../../../../api/apiConfigs';
import useGetCourseById from '../../../../../../hooks/course/useGetCourseById';
import ParagraphAtom from '../../../../../atoms/paragraph/paragraph.atom';
import CenteredBtnOrganism from '../../../../../molecules/centered-btn/centered-btn.molecules';
import './thumbnailUpload.scss';
import CourseContentSkeleton from '../../../../../atoms/course-content skeleton/courseContentSkeleton';
// import "./createCourse.scss";
const { Dragger } = Upload;

const CourseThumbnail = ({ courseId }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const [recallApi, setRecallApi] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const { data, loading } = useGetCourseById(courseId as string, recallApi);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const onSubmit = async (data: any) => {
    setBtnLoading(true);
    const formData = new FormData();
    formData.append('file_to_upload', data.thumbnail.file);
    setFile(data.thumbnail.file);
    try {
      const res = await apiConfigs.http?.patch(
        `/course/upload/thumbnail/${courseId}`,
        formData,
        {
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setUploadProgress(percentCompleted);
          },
        }
      );
      message.success(res?.data?.message);
      setRecallApi(recallApi + 1);
      setBtnLoading(false);
      setFileList([]);
    } catch (error: any) {
      message.error(error?.response?.message);
      setBtnLoading(false);
      setFileList([]);
    }
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.indexOf('image/') === 0;
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isImage) {
      message.error('You can only upload image files!');
    } else if (!isLt20M) {
      message.error('Image must smaller than 20MB!');
    } else {
      setFile(file);
    }
    return false;
  };

  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        {loading ? (
          <CourseContentSkeleton></CourseContentSkeleton>
        ) : (
          <Card headStyle={{ fontSize: '24px' }} title="Upload thumbnail">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
              >
                <div className="input-group">
                  <ParagraphAtom text="Select a appropriate thumbnail for this course" />
                  <Controller
                    name="thumbnail"
                    control={control}
                    render={({ field }) => (
                      <Upload
                        listType="picture"
                        beforeUpload={(file) => beforeUpload(file)}
                        onRemove={() => {
                          setFile(null);
                        }}
                        maxCount={1}
                        style={{ width: '100%' }}
                        {...field}
                      >
                        <Button
                          style={{ width: '100%' }}
                          icon={<UploadOutlined />}
                        >
                          Upload (Max: 1)
                        </Button>
                        <ParagraphAtom
                          text="Click or drag the thumbnail to this area to upload"
                          className="ant-upload-text"
                        ></ParagraphAtom>
                      </Upload>
                    )}
                  />
                  {data?.data?.thumbnail && (
                    <div className="thumbnail-image-div mt-20">
                      <Image src={data?.data?.thumbnail}></Image>
                    </div>
                  )}
                  <ParagraphAtom
                    type="secondary"
                    text="Select a thumbnail which will grab the learners attention"
                    className="mt-20 text-15"
                  />
                  {uploadProgress && btnLoading && (
                    <Progress percent={uploadProgress}></Progress>
                  )}
                </div>

                <CenteredBtnOrganism
                  justify="center"
                  text="Upload thumbnail"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={btnLoading}
                  disabled={file ? false : true}
                />
              </Space>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseThumbnail;
