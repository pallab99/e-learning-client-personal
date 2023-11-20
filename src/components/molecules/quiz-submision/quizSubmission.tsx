import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Radio } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import './quizSubmission.scss';
const Quiz = ({
  quizData,
  instructor,
  openCreateQuizModal,
  setQuizData,
  setAllQuizData,
}: any) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    const stringData = Object.values(data);
    console.log(stringData);
  };
  // const instructor = useAppSelector((state) => state.auth.userData.rank);
  return (
    <div className="quiz_submission_container">
      <div className="quiz_action_div"></div>
      <Form onFinish={handleSubmit(onSubmit)}>
        <div className="quiz_container">
          {quizData &&
            quizData?.questions?.map((question, index) => (
              <Form.Item key={index}>
                <Card>
                  <div className="quiz_card_div_wrapper">
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
        {!instructor && quizData?.questions?.length && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Quiz;
