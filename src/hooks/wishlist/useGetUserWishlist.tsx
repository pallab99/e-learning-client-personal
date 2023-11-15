import { useEffect, useState } from "react";
import WishlistApi from "../../api/WishlistApi";

const useGetWishlistByUser = (open: any, recallApi: any) => {
  const [wishlistData, setWishlistData] = useState<Array<any>>([]);
  const [wishlistLoading, setWishListLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (open) {
      getWishlistByUser();
    }
  }, [open, recallApi]);

  const getWishlistByUser = async () => {
    try {
      setWishListLoading(true);
      const response = await WishlistApi.getWishlistDataByUser();
      setWishlistData(response?.data?.data);
      setWishListLoading(false);
    } catch (error: any) {
      setWishListLoading(false);
      setError(error);
    } finally {
      setWishListLoading(false);
    }
  };

  return { wishlistData, wishlistLoading, error };
};

export default useGetWishlistByUser;
