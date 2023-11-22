import { Button, Modal, Space, Upload, message } from "antd";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateCourseAssignment from "../../../../hooks/assignment/useCreateCourseAssignment";
import createAssignmentSchema from "../../../../schema/course/createAssignment";
import AlertAtom from "../../../atoms/alert/alertAtom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import { SelectField } from "../../../atoms/select-filed/selectField";
import TextInputAtom from "../../../atoms/text-input/textInput.atom";
import CenteredBtnOrganism from "../../centered-btn/centered-btn.molecules";

interface ICourseContentModalProps {
  courseId?: string | undefined;
  data?: string;
  open: boolean;
  sectionData: any;
  onClose: any;
  recallApi?: any;
}

const CreateAssignmentMolecules: React.FC<ICourseContentModalProps> = ({
  courseId,
  data,
  open,
  onClose,
  sectionData,
  recallApi,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      instructions: "",
      point: "",
      sectionId: "",
      content: {
        file: null,
      },
    },
    resolver: zodResolver(createAssignmentSchema),
  });
  const { loading, createAssignment } = useCreateCourseAssignment();
  const onSubmit = async (contentData: any) => {
    console.log(contentData);
    const formData = new FormData();
    formData.append("title", contentData?.title);
    formData.append("description", contentData?.description);
    formData.append("instructions", contentData?.instructions);
    formData.append("point", contentData?.point);
    formData.append("sectionId", contentData?.sectionId);
    formData.append("file_to_upload", contentData?.content?.file);
    await createAssignment(courseId, contentData.sectionId, formData);
    if (!loading) {
      onClose();
      recallApi(Math.random());
    }
  };
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  const beforeUpload = (file: File) => {
    const allowedTypes = ["application/pdf"];
    const isTypeAllowed = allowedTypes.includes(file.type);
    const isLt100M = file.size / 1024 / 1024 < 100;

    if (!isTypeAllowed) {
      message.error("You can only upload PDF file");
    } else if (!isLt100M) {
      message.error("File must be smaller than 100MB!");
    } else {
      setFile(file);
    }
    return false;
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div className="input-group mb-20">
            <ParagraphAtom text={"Enter the Assignment title"} />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder="Enter the Assignment title"
                  size="large"
                  fieldValues={field}
                />
              )}
            />
            {errors?.title?.message && (
              <AlertAtom
                message={errors?.title?.message}
                type="error"
                className="mt-10"
              />
            )}
          </div>
          <div className="input-group mb-20">
            <ParagraphAtom text={"Enter the Assignment description"} />
            <Controller
              name={"description"}
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder="Enter the Assignment description"
                  size="large"
                  fieldValues={field}
                />
              )}
            />
            {errors?.description && (
              <AlertAtom
                message={errors.description.message}
                type="error"
                className="mt-10"
              />
            )}
          </div>

          <div className="input-group mb-20">
            <ParagraphAtom text={"Enter the Assignment instructions"} />
            <Controller
              name={"instructions"}
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder="Enter the Assignment instructions"
                  size="large"
                  fieldValues={field}
                />
              )}
            />
            {errors?.instructions && (
              <AlertAtom
                message={errors.instructions.message}
                type="error"
                className="mt-10"
              />
            )}
          </div>
          <div className="input-group mb-20">
            <ParagraphAtom text={"Enter the Assignment point"} />
            <Controller
              name={"point"}
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder="Enter the Assignment point"
                  size="large"
                  fieldValues={field}
                />
              )}
            />
            {errors?.point && (
              <AlertAtom
                message={errors.point.message}
                type="error"
                className="mt-10"
              />
            )}
          </div>

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

          <div className="input-group">
            <ParagraphAtom text="* Select the section. Max 1 assignment under a section" />
            <Controller
              name="sectionId"
              control={control}
              render={({ field }) => (
                <SelectField
                  values={sectionData}
                  placeholder="Select the section"
                  fieldValues={field}
                  size="large"
                />
              )}
            />
            {errors?.sectionId && (
              <AlertAtom
                message={errors.sectionId.message}
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

export default CreateAssignmentMolecules;
