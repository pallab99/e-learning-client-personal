import { useEffect, useState } from "react";
import QNAApi from "../../api/QNAApi";

const useGetAllQNAOfACourse = (
  courseId: string,
  modalOpen: boolean,
  recallApi?: number
) => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (modalOpen) {
      getAllQNAOfACourse(courseId);
    }
  }, [courseId, recallApi, modalOpen]);

  const getAllQNAOfACourse = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await QNAApi.getAllQNAOfACourse(courseId);
      if (response?.data?.data?.length <= 0) {
        setData([]);
      } else {
        setData(response?.data?.data[0]);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useGetAllQNAOfACourse;
