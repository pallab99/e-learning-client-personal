import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Space, Tooltip, message } from "antd";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CourseApi from "../../../../api/CourseApi";
import useGetAllCategory from "../../../../hooks/category/useGetAllCategory";
import CourseSchema from "../../../../schema/course/courseSchema";
import AlertAtom from "../../../atoms/alert/alertAtom";
import ButtonAtom from "../../../atoms/button/button.attom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import { SelectField } from "../../../atoms/select-filed/selectField";
import TextInputAtom from "../../../atoms/text-input/textInput.atom";
import CenteredBtnOrganism from "../../../molecules/centered-btn/centered-btn.molecules";
import TextEditor from "../../../molecules/text-editor/textEditor";
import InstructorDashboardSideBarOrganism from "../dashboard/sidebar/sidebar.organism";
import "./createCourse.scss";
const CreateCourseOrganism = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(CourseSchema),
  });
  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });
  const {
    fields: prerequisiteFields,
    append: appendPrerequisite,
    remove: removePrerequisite,
  } = useFieldArray({
    control,
    name: "prerequisites",
  });
  const navigate = useNavigate();
  const { category } = useGetAllCategory();
  const categoryValues =
    category &&
    category?.map((cate: any) => {
      return {
        label: cate?.title,
        value: cate?._id,
      };
    });
  const [createCourseLoader, setCreateCourseLoader] = useState(false);
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      setCreateCourseLoader(true);
      const res = await CourseApi.createCourse(data);
      message.success(res?.data?.message);
      setCreateCourseLoader(false);

      navigate("/instructor/courses");
    } catch (error: any) {
      message.error(error?.response?.message);
      setCreateCourseLoader(false);
    }
  };

  return (
    <div className="create-course-wrapper">
      <InstructorDashboardSideBarOrganism></InstructorDashboardSideBarOrganism>
      <div className="create-course-form mb-40 mt-40">
        <Card headStyle={{ fontSize: "30px" }} title="Create a new course">
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
                {errors?.title?.message && (
                  <AlertAtom
                    message={errors?.title?.message}
                    type="error"
                    className="mt-10"
                  />
                )}
                <ParagraphAtom
                  type="secondary"
                  text="Your title should be a mix of attention-grabbing, informative, and optimized for search"
                  className="mt-20 text-15"
                />
              </div>
              <div className="input-group">
                <ParagraphAtom text="Enter the course sub title" />
                <Controller
                  name="sub_title"
                  control={control}
                  render={({ field }) => (
                    <TextInputAtom
                      placeholder={"Enter the course sub title"}
                      fieldValues={field}
                    />
                  )}
                />
                {errors?.sub_title?.message && (
                  <AlertAtom
                    message={errors?.sub_title?.message}
                    type="error"
                    className="mt-10"
                  />
                )}
                <ParagraphAtom
                  type="secondary"
                  text="Your sub_title should be a mix of attention-grabbing, informative, and optimized for search"
                  className="mt-20 text-15"
                />
              </div>
              <div className="input-group">
                <ParagraphAtom text="Enter the course description" />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextEditor
                      // value={data?.data?.description}
                      // onChange={(content: any) => setDescription(content)}
                      field={field}
                    />
                  )}
                />
                {errors?.description?.message && (
                  <AlertAtom
                    message={errors?.description?.message}
                    type="error"
                    className="mt-10"
                  />
                )}
                <ParagraphAtom
                  type="secondary"
                  text="Description should have minimum 200 words."
                  className="mt-20 text-15"
                />
                {errors?.title?.message && (
                  <AlertAtom
                    message={errors?.title?.message}
                    type="error"
                    className="mt-10"
                  />
                )}
              </div>
              <div className="select-div">
                <div className="input-group">
                  <ParagraphAtom text="Select your category" />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        placeholder={"Select your category"}
                        fieldValues={field}
                        values={categoryValues}
                      />
                    )}
                  />
                  {errors?.category?.message && (
                    <AlertAtom
                      message={errors?.category?.message}
                      type="error"
                      className="mt-10"
                    />
                  )}
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
                  {errors?.level?.message && (
                    <AlertAtom
                      message={errors?.level?.message}
                      type="error"
                      className="mt-10"
                    />
                  )}
                  <ParagraphAtom
                    type="secondary"
                    text="Select the appropriate level of this course"
                    className="mt-20 text-15"
                  />
                </div>
              </div>

              <div className="input-group">
                <ParagraphAtom text="Enter the benefits of this course" />

                {benefitFields?.map((field, index) => (
                  <>
                    <div className="input_btn_combination" key={field.id}>
                      <Controller
                        name={`benefits[${index}]`}
                        control={control}
                        render={({ field }) => (
                          <TextInputAtom
                            fieldValues={field}
                            placeholder={"Enter a benefit of this course"}
                          />
                        )}
                      />
                      <Tooltip placement="top" title="Remove benefit">
                        <ButtonAtom
                          icon={<MinusOutlined />}
                          dangerBtn
                          handleButtonClick={() => removeBenefit(index)}
                          className="mt-10 mb-10"
                        />
                      </Tooltip>
                    </div>
                  </>
                ))}
                {errors?.benefits?.message && (
                  <AlertAtom
                    message={errors?.benefits?.message}
                    type="error"
                    className="mt-10"
                  />
                )}
                <ButtonAtom
                  icon={<PlusOutlined />}
                  handleButtonClick={() => appendBenefit("")}
                  className="mt-10 mb-10"
                />
                <ParagraphAtom
                  type="secondary"
                  text="Write some outcome of this course"
                  className="mt-20 text-15"
                />
              </div>
              <div className="input-group">
                <ParagraphAtom text="Enter the prerequisite for this course" />
                {prerequisiteFields?.map((field, index) => (
                  <>
                    <div className="input_btn_combination" key={field.id}>
                      <Controller
                        name={`prerequisites[${index}]`}
                        control={control}
                        render={({ field }) => (
                          <TextInputAtom
                            fieldValues={field}
                            placeholder={"Enter a prerequisite of this course"}
                          />
                        )}
                      />

                      <ButtonAtom
                        icon={<MinusOutlined />}
                        dangerBtn
                        className="mt-10 mb-10"
                        handleButtonClick={() => removePrerequisite(index)}
                      />
                    </div>
                  </>
                ))}
                {errors?.prerequisites?.message && (
                  <AlertAtom
                    message={errors?.prerequisites?.message}
                    type="error"
                    className="mt-10"
                  />
                )}

                <ButtonAtom
                  icon={<PlusOutlined />}
                  className="mt-10 mb-10"
                  handleButtonClick={() => appendPrerequisite("")}
                />
                <ParagraphAtom
                  type="secondary"
                  text="Give some information about what the learner should before getting started this course"
                  className="mt-20 text-15"
                />
              </div>
              <CenteredBtnOrganism
                justify="center"
                text="Create Course"
                type="primary"
                htmlType="submit"
                size="large"
                loading={createCourseLoader}
              />
            </Space>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateCourseOrganism;
