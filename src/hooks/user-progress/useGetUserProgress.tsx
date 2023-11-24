//@ts-nocheck
import { useEffect, useState } from "react";
import UserProgress from "../../api/UserProgress";

const useGetUserProgress = (courseId: string, recallApi?: number) => {
  const [userProgressData, setUserProgressData] = useState<object>({});
  const [userProgressLoading, setUserProgressLoading] = useState(false);
  const [error, setError] = useState();
  const [noSubmission, setNoSubmission] = useState(false);

  useEffect(() => {
    getUserProgress(courseId);
  }, [courseId, recallApi]);

  const getUserProgress = async (courseId: string) => {
    try {
      setUserProgressLoading(true);
      const response = await UserProgress.getUserProgress(courseId);
      console.log(response?.data?.data);
      setUserProgressData(response?.data);
      setUserProgressLoading(false);
      setError(null);
    } catch (error: any) {
      setUserProgressLoading(false);
      setError(error);
    } finally {
      setUserProgressLoading(false);
    }
  };

  return {
    userProgressData,
    userProgressLoading,
    error,
    noSubmission,
  };
};

export default useGetUserProgress;
