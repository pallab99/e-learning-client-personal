import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Progress, Space, Upload, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import apiConfigs from "../../../../../../api/apiConfigs";
import useGetCourseById from "../../../../../../hooks/course/useGetCourseById";
import ParagraphAtom from "../../../../../atoms/paragraph/paragraph.atom";
import CenteredBtnOrganism from "../../../../../molecules/centered-btn/centered-btn.molecules";
import "./promoVideo.scss";
// import "./createCourse.scss";

const UploadPromoVideo = ({ courseId }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const [recallApi, setRecallApi] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const { data, loading } = useGetCourseById(courseId as string, recallApi);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file_to_upload", data.promoVideo.file);
    try {
      setBtnLoading(true);
      const res = await apiConfigs.http?.patch(
        `/course/upload/demoVideo/${courseId}`,
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
      setBtnLoading(false);
      message.success(res?.data?.message);
      setRecallApi(recallApi + 1);
      setFileList([]);
    } catch (error: any) {
      message.error(error?.response?.message);
      setBtnLoading(false);
      setFileList([]);
    }
  };
  const beforeUpload = (file: File) => {
    const isImage = file.type.indexOf("video/") === 0;
    const isLt100M = file.size / 1024 / 1024 < 100;
    if (!isImage) {
      message.error("You can only upload video files!");
    } else if (!isLt100M) {
      message.error("Image must smaller than 20MB!");
    } else {
      setFile(file);
    }
    return false;
  };
  const [playerClass, setPlayerClass] = useState("");
  const videoRef = useRef(null);
  useEffect(() => {
    setPlayerClass("react-player");
  }, [data]);
  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <Card headStyle={{ fontSize: "24px" }} title="Upload promo video">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <div className="input-group">
                <ParagraphAtom text="Select a appropriate thumbnail for this course" />
                <Controller
                  name="promoVideo"
                  control={control}
                  render={({ field }) => (
                    <Upload
                      listType="picture"
                      beforeUpload={(file) => beforeUpload(file)}
                      onRemove={() => {
                        setFile(null);
                      }}
                      maxCount={1}
                      style={{ width: "100%" }}
                      {...field}
                    >
                      <Button
                        style={{ width: "100%" }}
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
                {data?.data?.demoVideo && (
                  <div className="player-wrapper mt-20" ref={videoRef}>
                    <ReactPlayer
                      url={data?.data?.demoVideo}
                      controls
                      className={playerClass}
                    />
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
                text="Upload video"
                type="primary"
                htmlType="submit"
                size="large"
                loading={btnLoading}
                disabled={file ? false : true}
              />
            </Space>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UploadPromoVideo;
