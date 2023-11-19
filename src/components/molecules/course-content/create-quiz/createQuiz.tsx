import { Button, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';
import { Controller, useForm } from 'react-hook-form';
import ButtonAtom from '../../../atoms/button/button.attom';
import { InputField } from '../../input-field-controller/inputFieldController';
import { SelectField } from '../../../atoms/select-filed/selectField';
import HeaderOrganism from '../../../organism/headerOragnism/header';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import TextInputAtom from '../../../atoms/text-input/textInput.atom';
import AlertAtom from '../../../atoms/alert/alertAtom';
import QuizFormSchema from '../../../../schema/course/quizSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface ICreateQuizModalProps {
  courseId?: string | undefined;
  data?: string;
  open: boolean;
  sectionData: any;
  onClose: any;
}
const CreateQuizModal: React.FC<ICreateQuizModalProps> = ({
  courseId,
  sectionData,
  data,
  open,
  onClose,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(QuizFormSchema),
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const addQuestion = () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  };
  const onSubmit = async (formData: any) => {
    console.log('form data', formData);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <HeadingAtom text="Create a new quiz" level={3} />

          {[...Array(numberOfQuestions)].map((_, index) => (
            <div key={index}>
              <div className="input-group mb-20">
                <ParagraphAtom text={'Enter the question'} />
                <Controller
                  name={`questions[${index}].question`}
                  control={control}
                  render={({ field }) => (
                    <TextInputAtom
                      placeholder={`Question ${index + 1}`}
                      size="large"
                      fieldValues={field}
                    />
                  )}
                />
                {errors.questions &&
                  errors?.questions[index] &&
                  errors?.questions[index]?.question && (
                    <AlertAtom
                      message={errors?.questions[index]?.question.message}
                      type="error"
                      className="mt-10"
                    />
                  )}
              </div>
              {[...Array(4)].map((_, optionIndex) => (
                <div className="input-group mb-20">
                  {/* <ParagraphAtom text={'Enter the question'} /> */}
                  <Controller
                    name={`questions[${index}].options[${optionIndex}]`}
                    control={control}
                    render={({ field }) => (
                      <TextInputAtom
                        placeholder={`Option ${optionIndex + 1}`}
                        size="large"
                        fieldValues={field}
                      />
                    )}
                  />
                  {errors.questions &&
                    errors.questions[index] &&
                    errors.questions[index].options &&
                    errors.questions[index].options[optionIndex] && (
                      <AlertAtom
                        message={
                          errors.questions[index].options[optionIndex].message
                        }
                        type="error"
                        className="mt-10"
                      />
                    )}
                </div>
              ))}
              <Controller
                name={`questions[${index}].correctAnswer`}
                control={control}
                render={({ field }) => (
                  <SelectField
                    values={[
                      { label: 'Option 1', value: '1' },
                      { label: 'Option 2', value: '2' },
                      { label: 'Option 3', value: '3' },
                      { label: 'Option 4', value: '4' },
                    ]}
                    fieldValues={field}
                    size="large"
                    placeholder="Select the right answer"
                  ></SelectField>
                )}
              />
              {errors.questions &&
                errors.questions[index] &&
                errors.questions[index].correctAnswer && (
                  <AlertAtom
                    message={errors.questions[index].correctAnswer.message}
                    type="error"
                    className="mt-10"
                  />
                )}
              <div className="input-group mb-20">
                <Controller
                  name={`questions[${index}].point`}
                  control={control}
                  render={({ field }) => (
                    <TextInputAtom
                      placeholder={`Points`}
                      size="large"
                      fieldValues={field}
                    />
                  )}
                />
                {errors.questions &&
                  errors.questions[index] &&
                  errors.questions[index].point && (
                    <AlertAtom
                      message={errors.questions[index].point.message}
                      type="error"
                      className="mt-10"
                    />
                  )}
              </div>
            </div>
          ))}
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
          <ButtonAtom
            text={'Add Another question'}
            size="large"
            handleButtonClick={addQuestion}
          />
          <CenteredBtnOrganism
            justify="center"
            text={'create'}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default CreateQuizModal;
