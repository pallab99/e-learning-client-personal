import { useEffect, useState } from "react";
import WishlistApi from "../../api/WishlistApi";
import { STUDENT } from "../../constant/userType";
import { useAppSelector } from "../../redux/store";

const useGetCourseAvailableInWishlistByUser = (courseId: string) => {
  const [courseAvailableInUserWishlist, setCourseAvailableInUserWishlist] =
    useState<any>(false);
  const [wishlistLoading, setWishListLoading] = useState(false);
  const [error, setError] = useState(null);
  const isStudent = useAppSelector((state) => state.auth.userData.rank);
  const callWishListApi = useAppSelector((state) => state.wishlist.cnt);
  useEffect(() => {
    if (isStudent === STUDENT && courseId) {
      courseAvailableInWishlist(courseId);
    }
  }, [isStudent, courseId, callWishListApi]);

  const courseAvailableInWishlist = async (courseId: string) => {
    try {
      setWishListLoading(true);
      const response = await WishlistApi.courseAvailableInWishlist(courseId);
      if (response?.data?.data) {
        setCourseAvailableInUserWishlist(true);
      } else {
        setCourseAvailableInUserWishlist(false);
      }
      setWishListLoading(false);
      setError(null);
    } catch (error: any) {
      setWishListLoading(false);
      setError(error);
    } finally {
      setWishListLoading(false);
    }
  };

  return { courseAvailableInUserWishlist, wishlistLoading, error };
};

export default useGetCourseAvailableInWishlistByUser;
