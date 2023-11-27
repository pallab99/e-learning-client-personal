//@ts-nocheck
import { UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Space, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useUpdateCourseAssignment from "../../../../hooks/assignment/useUpdateCourseAssignment";
import updateAssignmentSchema from "../../../../schema/course/updateAssignment";
import AlertAtom from "../../../atoms/alert/alertAtom";
import ButtonAtom from "../../../atoms/button/button.attom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
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

const UpdateAssignmentMolecules: React.FC<ICourseContentModalProps> = ({
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
    resolver: zodResolver(updateAssignmentSchema),
  });
  console.log("assignment daatata", data);
  useEffect(() => {
    setValue("title", data?.title);
    setValue("description", data?.description);
    setValue("instructions", data?.instructions);
    setValue("point", String(data?.point));
  }, [data, setValue]);

  const { loading, updateAssignment } = useUpdateCourseAssignment();
  const onSubmit = async (contentData: any) => {
    console.log("update submit assignment", contentData);
    if (!contentData?.content?.file) {
      await updateAssignment(
        courseId,
        data.courseSection,
        data?._id,
        contentData
      );
      if (!loading) {
        onClose();
        recallApi(Math.random());
      }
    } else {
      console.log("file to upload");

      const formData = new FormData();
      formData.append("title", contentData?.title);
      formData.append("description", contentData?.description);
      formData.append("instructions", contentData?.instructions);
      formData.append("point", contentData?.point);
      formData.append("file_to_upload", contentData?.content?.file);

      await updateAssignment(
        courseId,
        data?.courseSection,
        data?._id,
        formData
      );
      if (!loading) {
        setValue("title", "");
        setValue("description", "");
        setValue("instructions", "");
        setValue("point", "");
        setValue("content", null);

        onClose();
        recallApi(Math.random());
      }
    }
  };
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [openAssignmentPreview, setOpenAssignmnetPreview] = useState(false);
  const [assignmentFile, setAssignmentFile] = useState("");
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
    <Modal open={open} onCancel={onClose} footer={null} centered>
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
          <ButtonAtom
            text="Preview Uploaded File"
            type="text"
            handleButtonClick={() => {
              setOpenAssignmnetPreview(true);
              setAssignmentFile(data?.assignmentFileURL);
            }}
            className="instructor_preview_assignment_btn"
          ></ButtonAtom>
          <Modal
            open={openAssignmentPreview}
            onCancel={() => setOpenAssignmnetPreview(false)}
            footer={null}
            centered
          >
            <div className="assignment_iframe_div mt-40">
              <iframe src={assignmentFile} height={600} width={"100%"}></iframe>
            </div>
          </Modal>
          <CenteredBtnOrganism
            justify="center"
            text={"Update"}
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

export default UpdateAssignmentMolecules;
