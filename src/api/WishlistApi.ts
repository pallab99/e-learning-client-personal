import Api from './apiConfigs';

class WishlistApi {
  endPoints = {
    wishlistByUser: '/wishlist/details',
    removeCourseFromWishlist: '/wishlist/update',
    CourseAvailableInWishlist: 'wishlist/course-available/',
    addToWishList: '/wishlist/create',
  };
  async getWishlistDataByUser() {
    return await Api?.http?.get(this.endPoints.wishlistByUser);
  }
  async removeCourseFromWishlist(courseId: string) {
    return await Api.http?.patch(this.endPoints.removeCourseFromWishlist, {
      courseId,
    });
  }
  async courseAvailableInWishlist(courseId: string) {
    return await Api.http?.get(
      this.endPoints.CourseAvailableInWishlist + courseId
    );
  }
  async addCourseToTheWishlist(courseId: string) {
    return await Api.http?.post(this.endPoints.addToWishList, {
      courseId,
    });
  }
}

export default new WishlistApi();
