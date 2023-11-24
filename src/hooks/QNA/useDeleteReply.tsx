import { message } from 'antd';
import QNAApi from '../../api/QNAApi';

const useDeleteReply = () => {
  const deleteReply = async (
    courseId: string,
    qnaId: string,
    questionId: string,
    replyId: string
  ) => {
    try {
      const response = await QNAApi.deleteReply(
        courseId,
        qnaId,
        questionId,
        replyId
      );
      message.success(response?.data.message);
    } catch (error: any) {
      message.error(error.response.message);
    }
  };

  return { deleteReply };
};

export default useDeleteReply;
