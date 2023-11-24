import { message } from "antd";
import { useState } from "react";
import UserProgress from "../../api/UserProgress";
import { IUserLoginData } from "../../types/userData";

const useAddToUserProgress = () => {
  const [userProgressLoading, setUserProgressLoading] = useState(false);
  const [userProgressData, setUserProgressData] = useState<IUserLoginData>();

  const addToUserProgress = async (courseId: string, contentId: string) => {
    try {
      const data = {
        courseId: courseId,
        contentId: contentId,
      };
      setUserProgressLoading(true);
      const response = await UserProgress.addToUserProgress(data);
      setUserProgressData(response?.data);
      message.success(response?.data.message);
    } catch (error: any) {
      setUserProgressLoading(false);
      message.error(error.response.message);
    } finally {
      setUserProgressLoading(false);
    }
  };

  return { userProgressLoading, addToUserProgress, userProgressData };
};

export default useAddToUserProgress;
