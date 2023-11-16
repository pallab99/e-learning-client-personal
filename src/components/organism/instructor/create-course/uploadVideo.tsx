import { Card, Progress, Space, Upload } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import apiConfigs from "../../../../api/apiConfigs";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import CenteredBtnOrganism from "../../../molecules/centered-btn/centered-btn.molecules";
import "./createCourse.scss";
const { Dragger } = Upload;

const UploadCoursePromoVideo = ({ courseId }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file_to_upload", data.promoVideo.file);
    try {
      const res = await apiConfigs.http?.patch(
        `/course/upload/demoVideo/${courseId}`,
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
      <div className="create-course-form mb-40 mt-40">
        <Card headStyle={{ fontSize: "30px" }} title="Upload promo video">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <div className="input-group">
                <ParagraphAtom text="Select a appropriate promo video for this course" />
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
                        text="Click or drag the promo video to this area to upload"
                        className="ant-upload-text"
                      ></ParagraphAtom>
                    </Dragger>
                  )}
                />
                <ParagraphAtom
                  type="secondary"
                  text="Select a promo video which will grab the learners attention"
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
