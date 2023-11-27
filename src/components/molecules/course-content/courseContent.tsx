//@ts-nocheck
import { UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Space, Upload, message } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useCreateCourseContent from "../../../hooks/course-content/useCreateCourseContent";
import CourseContentSchema from "../../../schema/course/courseContent";
import AlertAtom from "../../atoms/alert/alertAtom";
import ParagraphAtom from "../../atoms/paragraph/paragraph.atom";
import { SelectFieldCustom } from "../../atoms/select-field-custom/selectFieldCustom";
import { SelectField } from "../../atoms/select-filed/selectField";
import TextInputAtom from "../../atoms/text-input/textInput.atom";
import CenteredBtnOrganism from "../centered-btn/centered-btn.molecules";

interface ICourseContentModalProps {
  courseId?: string | undefined;
  data?: string;
  open: boolean;
  sectionData: any;
  onClose: any;
  setRecallApi?: any;
}
const CourseContentMolecules: React.FC<ICourseContentModalProps> = ({
  courseId,
  data,
  open,
  onClose,
  sectionData,
  setRecallApi,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(CourseContentSchema),
  });
  const { loading, createCourseContent } = useCreateCourseContent();
  const [contentType, setContentType] = useState("");
  const [recordFile, setRecordedFile] = useState();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const onSubmit = async (contentData: any) => {
    console.log("recorded", file);

    const formData = new FormData();
    formData.append("title", contentData?.title);
    if (contentType === "file") {
      console.log("file");
      formData.append("file_to_upload", file);
    } else {
      formData.append("file_to_upload", recordFile);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await createCourseContent(courseId, contentData?.sectionId, formData);
    if (!loading) {
      onClose();
      setRecallApi(Math.random());
    }
  };

  const beforeUpload = (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "text/plain",
      "video/mp4",
    ];
    const isTypeAllowed = allowedTypes.includes(file.type);
    const isLt100M = file.size / 1024 / 1024 < 100;

    if (!isTypeAllowed) {
      message.error(
        "You can only upload images, PDFs, text documents, or videos!"
      );
    } else if (!isLt100M) {
      message.error("File must be smaller than 100MB!");
    } else {
      setFile(file);
    }
    return false;
  };
  const [enable, setEnable] = useState(true);

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div className="input-group">
            <ParagraphAtom text="Enter the course title" />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder={"Enter the course title"}
                  fieldValues={field}
                />
              )}
            />
            {errors?.title && (
              <AlertAtom
                message={errors?.title?.message}
                type="error"
                className="mt-10"
              />
            )}
          </div>
          <div className="input-group">
            <ParagraphAtom text="* Select the content type" />
            <SelectFieldCustom
              placeholder="Select content type"
              values={[{ label: "File", value: "file" }]}
              handleOnchange={(value: string) => setContentType(value)}
              size="large"
            />
          </div>
          {!contentType && (
            <AlertAtom
              message={"Select the content type"}
              className="mt-10"
              type="error"
            ></AlertAtom>
          )}
          {contentType === "file" && (
            <div className="input-group">
              <ParagraphAtom text="Select a appropriate lesson for this section" />
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Upload
                    listType="picture"
                    beforeUpload={(file) => {
                      setFile(file);
                      return beforeUpload(file);
                    }}
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
                      size="large"
                    >
                      Upload (Max: 1)
                    </Button>
                  </Upload>
                )}
              />
            </div>
          )}

          <div className="input-group">
            <ParagraphAtom text="* Select the section" />
            <Controller
              name="sectionId"
              control={control}
              render={({ field }) => (
                <SelectField
                  values={sectionData}
                  placeholder={"Select the section"}
                  fieldValues={field}
                  size="large"
                />
              )}
            />
            {errors?.sectionId?.message && (
              <AlertAtom
                message={errors?.sectionId?.message}
                type="error"
                className="mt-10"
              />
            )}
          </div>
          <CenteredBtnOrganism
            justify="center"
            text={"create"}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
            loading={loading}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default CourseContentMolecules;
