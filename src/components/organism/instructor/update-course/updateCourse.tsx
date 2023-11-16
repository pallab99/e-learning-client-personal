import { Card, Space, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import TextInputAtom from "../../../atoms/text-input/textInput.atom";
// import './createCourse.scss';
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetCourseById from "../../../../hooks/course/useGetCourseById";
import useUpdateCourse from "../../../../hooks/course/useUpdateCourse";
import CourseFormSkeleTon from "../../../atoms/course-form-skeleton/courseFormSkeleton";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import { SelectField } from "../../../atoms/select-filed/selectField";
import CenteredBtnOrganism from "../../../molecules/centered-btn/centered-btn.molecules";
const { Dragger } = Upload;

const UpdateCourseOrganism = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const { courseId } = useParams();
  const { data, loading } = useGetCourseById(courseId as string);

  useEffect(() => {
    if (data) {
      setValue("title", data?.data?.title);
      setValue("description", data?.data?.description);
      setValue("tags", data?.data?.tags);
      setValue("category", data?.data?.category);
      setValue("level", data?.data?.level);
      setValue("benefits", data?.data?.benefits);
      setValue("prerequisites", data?.data?.prerequisites);
    }
  }, [data, setValue]);
  const { btnLoading, updateCourse } = useUpdateCourse();
  const onSubmit = async (data: any) => {
    await updateCourse(courseId as string, data);
  };

  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <Card headStyle={{ fontSize: "30px" }} title="Modify your course">
          {loading ? (
            <CourseFormSkeleTon />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
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
                  <ParagraphAtom
                    type="secondary"
                    text="Your title should be a mix of attention-grabbing, informative, and optimized for search"
                    className="mt-20 text-15"
                  />
                </div>
                <div className="input-group">
                  <ParagraphAtom text="Enter the course description" />

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        rows={3}
                        placeholder="Enter the course description"
                        maxLength={1000}
                      />
                    )}
                  />
                  <ParagraphAtom
                    type="secondary"
                    text="Description should have minimum 200 words."
                    className="mt-20 text-15"
                  />
                </div>
                <div className="select-div">
                  <div className="input-group">
                    <ParagraphAtom text="Select tags" />
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          placeholder={"Select Tags"}
                          fieldValues={field}
                          values={[
                            { label: "hello tags", value: "tags a" },
                            { label: "hello tags 2", value: "tags b" },
                          ]}
                        />
                      )}
                    />
                    <ParagraphAtom
                      type="secondary"
                      text="Select the Instructors"
                      className="mt-20 text-15"
                    />
                  </div>
                  <div className="input-group">
                    <ParagraphAtom text="Select your category" />
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          placeholder={"Select your category"}
                          fieldValues={field}
                          values={[
                            { label: "hello 1", value: "category a" },
                            { label: "hello 2", value: "category b" },
                          ]}
                        />
                      )}
                    />
                    <ParagraphAtom
                      type="secondary"
                      text="Select the category of the course."
                      className="mt-20 text-15"
                    />
                  </div>
                  <div className="input-group">
                    <ParagraphAtom text="Level of this course" />
                    <Controller
                      name="level"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          placeholder={"Select the level of this course"}
                          fieldValues={field}
                          values={[
                            { label: "Beginner", value: "beginner" },
                            { label: "Intermediate", value: "intermediate" },
                            { label: "Advance", value: "advance" },
                          ]}
                        />
                      )}
                    />
                    <ParagraphAtom
                      type="secondary"
                      text="Select the appropriate level of this course"
                      className="mt-20 text-15"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <ParagraphAtom text="Enter the benefits of this course" />
                  <Controller
                    name="benefits"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        placeholder={"Enter the benefits of this course"}
                        fieldValues={field}
                      />
                    )}
                  />
                  <ParagraphAtom
                    type="secondary"
                    text="Write some outcome of this course"
                    className="mt-20 text-15"
                  />
                </div>
                <div className="input-group">
                  <ParagraphAtom text="Enter the prerequiste for this course" />
                  <Controller
                    name="prerequisites"
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        placeholder={"Enter the prerequiste for this course"}
                        fieldValues={field}
                      />
                    )}
                  />
                  <ParagraphAtom
                    type="secondary"
                    text="Give some information about what the learner should before getting started this course"
                    className="mt-20 text-15"
                  />
                </div>

                <CenteredBtnOrganism
                  justify="center"
                  text="Update Course"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                  loading={btnLoading}
                />
              </Space>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UpdateCourseOrganism;
