//@ts-nocheck
import { useEffect, useState } from 'react';
import UserProgress from '../../api/UserProgress';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { STUDENT } from '../../constant/userType';
import { updateUerProgress } from '../../redux/slices/userProgressSlice';

const useGetUserProgress = (courseId: string, recallApi?: number) => {
  const [userProgressData, setUserProgressData] = useState<object>({});
  const [userProgressLoading, setUserProgressLoading] = useState(false);
  const [error, setError] = useState();
  const [noSubmission, setNoSubmission] = useState(false);
  const userData = useAppSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userData && userData.rank === STUDENT) {
      getUserProgress(courseId);
    }
  }, [courseId, recallApi, userData, dispatch]);

  const getUserProgress = async (courseId: string) => {
    try {
      setUserProgressLoading(true);
      const response = await UserProgress.getUserProgress(courseId);
      console.log(response?.data?.data);
      setUserProgressData(response?.data);
      setUserProgressLoading(false);
      dispatch(updateUerProgress(response?.data?.data?.progressPercentage));
      setError(null);
    } catch (error: any) {
      setUserProgressLoading(false);
      dispatch(updateUerProgress(0));

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
