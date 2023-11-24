import { message } from "antd";
import QNAApi from "../../api/QNAApi";

const useDeleteQuestion = () => {
  const deleteQuestion = async (
    courseId: string,
    qnaId: string,
    questionId: string
  ) => {
    try {
      const response = await QNAApi.deleteQuestion(courseId, qnaId, questionId);
      message.success(response?.data.message);
    } catch (error: any) {
      message.error(error.response.message);
    }
  };

  return { deleteQuestion };
};

export default useDeleteQuestion;
