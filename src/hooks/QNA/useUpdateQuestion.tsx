import { message } from "antd";
import QNAApi from "../../api/QNAApi";

const useUpdateQuestion = () => {
  const updateQNA = async (
    courseId: string,
    questionId: string,
    question: string
  ) => {
    try {
      const data = {
        question: question,
      };
      const response = await QNAApi.updateQNA(courseId, questionId, data);
      message.success(response?.data.message);
    } catch (error: any) {
      message.error(error.response.message);
    }
  };

  return { updateQNA };
};

export default useUpdateQuestion;
