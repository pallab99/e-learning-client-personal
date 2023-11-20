import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import QuizApi from '../../../../api/QuizApi';
import QuizFormSchema from '../../../../schema/course/quizSchema';
import AlertAtom from '../../../atoms/alert/alertAtom';
import ButtonAtom from '../../../atoms/button/button.attom';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import { SelectField } from '../../../atoms/select-filed/selectField';
import TextInputAtom from '../../../atoms/text-input/textInput.atom';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';

interface ICreateQuizModalProps {
  courseId?: string | undefined;
  data?: string;
  open: boolean;
  sectionData: any;
  onClose: any;
  recallApi?: any;
  quizData?: any;
  allQuizData?: any;
}
const UpdateQuizModal: React.FC<ICreateQuizModalProps> = ({
  courseId,
  sectionData,
  data,
  open,
  onClose,
  recallApi,
  quizData,
  allQuizData,
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

  useEffect(() => {
    if (allQuizData) {
      setValue('courseSection', allQuizData?.courseSection);
      setValue('title', allQuizData?.title);
      allQuizData?.questions?.forEach((question, questionIndex) => {
        setValue(`questions[${questionIndex}].question`, question.question);
        setValue(
          `questions[${questionIndex}].correctAnswer`,
          question.correctAnswer.toString()
        );
        setValue(
          `questions[${questionIndex}].point`,
          question?.point?.toString()
        );
        if (question.options) {
          question.options.forEach((option, optionIndex) => {
            setValue(
              `questions[${questionIndex}].options[${optionIndex}]`,
              option
            );
          });
        }
      });
    }
  }, [allQuizData, setValue]);
  useEffect(() => {
    if (allQuizData) {
      setNumberOfQuestions(allQuizData?.questions?.length);
    }
  }, [allQuizData, setValue, setNumberOfQuestions]);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData: any) => {
    console.log('form data', formData);

    try {
      setLoading(true);
      const res = await QuizApi.updateQuiz(allQuizData?._id, formData);
      message.success(res?.data?.message);
      setLoading(false);
      if (!loading) {
        recallApi(Math.random());
        onClose();
      }
    } catch (error: any) {
      message.error(error.response.message);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <HeadingAtom text={'Update the existing quiz'} level={3} />
          <div className="input-group mb-20">
            <ParagraphAtom text={'Enter the Quiz title'} />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInputAtom
                  placeholder="Enter the Quiz title"
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
              name="courseSection"
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
            {errors?.courseSection && (
              <AlertAtom
                message={errors.courseSection.message}
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
            text={'Update Quiz'}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
            loading={loading}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default UpdateQuizModal;
