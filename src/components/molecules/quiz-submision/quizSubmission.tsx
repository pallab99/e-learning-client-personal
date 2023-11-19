import React from 'react';
import { Form, Radio, Button, Card } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import './quizSubmission.scss';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
const Quiz = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    const stringData = Object.values(data);
    console.log(stringData);
  };
  const quizData = {
    questions: [
      {
        question: 'Test question1?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        point: 2,
        _id: '6559c1d716670f659e81e3f5',
      },
      {
        question: 'Test question2?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 4,
        point: 2,
        _id: '6559c1d716670f659e81e3f6',
      },
      {
        question: 'Test question3?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        point: 2,
        _id: '6559c1d716670f659e81e3f7',
      },
    ],
  };

  return (
    <div className="quiz_submission_container">
      <Form onFinish={handleSubmit(onSubmit)}>
        <div className="quiz_container">
          {quizData.questions.map((question, index) => (
            <Form.Item key={index}>
              <Card>
                <div className="question_div">
                  <ParagraphAtom
                    text={`${index + 1}. ${question.question}`}
                    className="text-22"
                  />
                  <ParagraphAtom
                    text={` ${question.point} points`}
                    className="text-22"
                  />
                </div>
                <Controller
                  name={`question${index + 1}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Radio.Group
                      size="large"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value}
                    >
                      {question.options.map((option, i) => (
                        <div className="question_options mt-10">
                          <Radio value={option} key={i}>
                            {option}
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  )}
                />
              </Card>
            </Form.Item>
          ))}
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Quiz;
