import { Card, Space, Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import TextInputAtom from '../../../atoms/text-input/textInput.atom';
// import './createCourse.scss';
import CenteredBtnOrganism from '../../../molecules/centered-btn/centered-btn.molecules';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import { SelectField } from '../../../atoms/select-filed/selectField';
import TextArea from 'antd/es/input/TextArea';
const { Dragger } = Upload;

const UpdateCourseOrganism = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="create-course-form mb-40 mt-40">
      <Card headStyle={{ fontSize: '30px' }} title="Modify your course">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div className="input-group">
              <ParagraphAtom text="Enter the course title" />
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInputAtom
                    placeholder={'Enter the course title'}
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
                    maxLength={6}
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
                <ParagraphAtom text="Select Instructors" />
                <Controller
                  name="tag"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      placeholder={'Select Instructors'}
                      fieldValues={field}
                      values={['a', 'b']}
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
                      placeholder={'Select your category'}
                      fieldValues={field}
                      values={['a', 'b']}
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
                <ParagraphAtom text="Select the level of this course" />
                <Controller
                  name="level"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      placeholder={'Select the level of this course'}
                      fieldValues={field}
                      values={['Beginner', 'Intermediate', 'Advance']}
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
                    placeholder={'Enter the benefits of this course'}
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
                    placeholder={'Enter the prerequiste for this course'}
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

            <div className="input-group">
              <ParagraphAtom text="Select a appropriate thumbnail for this course" />
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <Dragger {...field} listType="picture">
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
            <div className="input-group">
              <ParagraphAtom text="Select a appropriate demo video for this course" />
              <Controller
                name="demovideo"
                control={control}
                render={({ field }) => (
                  <Dragger {...field} listType="picture">
                    <p className="ant-upload-drag-icon">
                      <img
                        src="https://s.udemycdn.com/course/750x422/placeholder.jpg"
                        alt=""
                      />
                    </p>
                    <ParagraphAtom
                      text=" Click or drag the demo video file to this area to upload"
                      className="ant-upload-text"
                    />
                  </Dragger>
                )}
              />
              <ParagraphAtom
                type="secondary"
                text="Select a demo video which will grab the learners attention"
                className="mt-20 text-15"
              />
            </div>
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
  );
};

export default UpdateCourseOrganism;
