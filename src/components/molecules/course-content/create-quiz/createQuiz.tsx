import { Button, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import CenteredBtnOrganism from '../../centered-btn/centered-btn.molecules';
import { Controller, useForm } from 'react-hook-form';
import ButtonAtom from '../../../atoms/button/button.attom';
import { InputField } from '../../input-field-controller/inputFieldController';
import { SelectField } from '../../../atoms/select-filed/selectField';
import HeaderOrganism from '../../../organism/headerOragnism/header';
import HeadingAtom from '../../../atoms/heading/heading.atom';

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
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const addQuestion = () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  };
  const onSubmit = async (formData: any) => {
    console.log(formData);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <HeadingAtom text="Create a new quiz" level={3} />
          <InputField
            name={'title'}
            control={control}
            placeholder={`Enter a title of this quiz`}
            text="Enter a title of this quiz"
          />
          <InputField
            name={'description'}
            control={control}
            placeholder={`Enter a description of this quiz`}
            text="Enter a description of this quiz"
          />
          {[...Array(numberOfQuestions)].map((_, index) => (
            <div key={index}>
              <InputField
                name={`questions[${index}].question`}
                control={control}
                placeholder={`Question ${index + 1}`}
              />
              {[...Array(4)].map((_, optionIndex) => (
                <InputField
                  name={`questions[${index}].options[${optionIndex}]`}
                  control={control}
                  placeholder={`Option ${optionIndex + 1}`}
                />
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
              <InputField
                name={`questions[${index}].point`}
                control={control}
                placeholder={`Points`}
              />
            </div>
          ))}

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
