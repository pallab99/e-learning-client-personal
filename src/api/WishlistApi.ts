import Api from "./apiConfigs";

class WishlistApi {
  endPoints = {
    wishlistByUser: "/wishlist/details",
    removeCourseFromWishlist: "/wishlist/update",
    // rejectSubscription: "/subscription/reject-subscription",
  };
  async getWishlistDataByUser() {
    return await Api?.http?.get(this.endPoints.wishlistByUser);
  }
  async removeCourseFromWishlist(courseId: string) {
    return await Api.http?.patch(this.endPoints.removeCourseFromWishlist, {
      courseId,
    });
  }
}

export default new WishlistApi();
