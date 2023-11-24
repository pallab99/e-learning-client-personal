//@ts-nocheck
import { Card, Form, Radio, message } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import QuizApi from "../../../../api/QuizApi";
import useGetQuizById from "../../../../hooks/quiz/useGetQuizById";
import useGetSubmittedQuiz from "../../../../hooks/quiz/useGetSubmittedQuiz";
import AlertAtom from "../../../atoms/alert/alertAtom";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import QuizSubmissionSkeleton from "../../../atoms/quiz-submission-skeleton/quizSubmissionSkeleton";
import "./studentQuizSubmission.scss";

const QuizSubmission = () => {
  const { handleSubmit, control, setValue } = useForm({ mode: "onChange" });

  const { sectionId, quizId } = useParams();
  const [recallApi, setRecallApi] = useState(0);
  const { submittedQuiz, SubmittedQuizLoading } = useGetSubmittedQuiz(
    quizId as string,
    recallApi
  );
  const { loading, data } = useGetQuizById(
    sectionId as string,
    quizId as string,
    submittedQuiz as any
  );

  const [quizAnswer, setQuizAnswer] = useState<number[]>([]);
  const handleRadioChange = (index: number) => {
    setQuizAnswer([...quizAnswer, index + 1]);
  };

  const [submissionLoading, setSubmissionLoading] = useState(false);
  const onSubmit = async (data: any) => {
    try {
      setSubmissionLoading(true);
      const quizData = {
        answer: quizAnswer,
      };
      const response = await QuizApi.submitQuiz(quizId, quizData);
      message.success(response?.data?.message);
      setSubmissionLoading(false);
      if (!submissionLoading) {
        setRecallApi(Math.random());
      }
    } catch (error: any) {
      message.error(error?.response?.message);
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="student_quiz_submission_container mt-50">
      <div className="student_quiz_action_div"></div>
      {SubmittedQuizLoading || loading ? (
        <QuizSubmissionSkeleton />
      ) : (
        <Form onFinish={handleSubmit(onSubmit)}>
          <div className="student_quiz_container">
            {submittedQuiz && !submittedQuiz?.answers && (
              <HeadingAtom
                text="Select all the options before submission"
                level={4}
                className="mt-30 mb-20"
              />
            )}
            {submittedQuiz && submittedQuiz?.answers && (
              <AlertAtom
                message={`You Have guessed ${submittedQuiz?.obtainedMarks} correct answer in this quiz`}
                type="success"
                className="mb-30  "
              />
            )}
            {data &&
              data?.questions?.map((question, index) => (
                <Form.Item key={index}>
                  <Card>
                    <div className="quiz_card_div_wrapper">
                      <div className="question_div">
                        <ParagraphAtom
                          text={`${index + 1}. ${question.question}`}
                          className={`text-22 ${
                            submittedQuiz && submittedQuiz?.answers
                              ? question?.correctAnswer ===
                                submittedQuiz?.answers[index]
                                ? "correct-answer_bg"
                                : "wrong-answer_bg"
                              : ""
                          }`}
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
                      render={({ field }) => (
                        <Radio.Group
                          size="large"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          value={field.value}
                        >
                          {question.options.map((option, i) => (
                            <div className="question_options mt-10" key={i}>
                              <Radio
                                value={i}
                                className={
                                  submittedQuiz && submittedQuiz?.answers
                                    ? question?.correctAnswer === i + 1
                                      ? "correct-answer"
                                      : submittedQuiz?.answers[index] === i + 1
                                      ? "wrong-answer"
                                      : ""
                                    : ""
                                }
                                onChange={(e) => handleRadioChange(i)}
                                disabled={
                                  !!(submittedQuiz && submittedQuiz?.answers)
                                }
                              >
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

          <div className="quiz_submission_btn_div">
            {submittedQuiz && !submittedQuiz?.answers && (
              <ButtonAtom
                text="Submit"
                type="primary"
                htmlType="submit"
                style={{ width: "50%" }}
                disabled={quizAnswer.length != data?.questions?.length}
                loading={submissionLoading}
              />
            )}
          </div>
        </Form>
      )}
    </div>
  );
};

export default QuizSubmission;
