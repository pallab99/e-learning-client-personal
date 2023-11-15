import { message } from "antd";
import { useState } from "react";
import WishlistApi from "../../api/WishlistApi";

const useRemoveCourseFromWishlist = () => {
  const [removeWishlistLoading, setRemoveWishlistLoading] = useState(false);
  const removeCourseFromWishlist = async (courseId: string) => {
    try {
      setRemoveWishlistLoading(true);
      const response = await WishlistApi.removeCourseFromWishlist(courseId);
      setRemoveWishlistLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setRemoveWishlistLoading(false);
      message.error(error.response.message);
    } finally {
      setRemoveWishlistLoading(false);
    }
  };

  return { removeWishlistLoading, removeCourseFromWishlist };
};

export default useRemoveCourseFromWishlist;
