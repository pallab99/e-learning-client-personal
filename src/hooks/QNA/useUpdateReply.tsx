import { message } from 'antd';
import QNAApi from '../../api/QNAApi';
import { useState } from 'react';

const useUpdateReply = () => {
  const [updateReplyLoader, setUpdateReplyLoader] = useState(false);
  const updateReply = async (
    courseId: string,
    questionId: string,
    replyId: string,
    reply: string
  ) => {
    try {
      setUpdateReplyLoader(true);
      const data = {
        reply: reply,
      };
      const response = await QNAApi.updateReply(
        courseId,
        questionId,
        replyId,
        data
      );
      message.success(response?.data.message);
      setUpdateReplyLoader(false);
    } catch (error: any) {
      message.error(error.response.message);
      setUpdateReplyLoader(false);
    }
  };

  return { updateReply, updateReplyLoader };
};

export default useUpdateReply;
