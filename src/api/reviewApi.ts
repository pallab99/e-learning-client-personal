import Api from './apiConfigs';

class CartApi {
  endPoints = {
    addReview: '/review-rating/create/',
    getAllReviewByCourse: '/review-rating/all/',
    updateReviewRating: '/review-rating/update/',
    deleteReview: '/review-rating/delete/',
  };
  async addReview(courseId: string, review: any) {
    return await Api?.http?.post(
      `${this.endPoints.addReview}${courseId}`,
      review
    );
  }
  async getAllReviewByCourse(courseId: string) {
    return await Api.http?.get(
      `${this.endPoints.getAllReviewByCourse}${courseId}`
    );
  }
  async updateReview(reviewId: string, review: any) {
    return await Api?.http?.patch(
      `${this.endPoints.updateReviewRating}${reviewId}`,
      review
    );
  }
  async deleteReview(courseId: string, reviewId: string) {
    return await Api?.http?.delete(
      `${this.endPoints.deleteReview}${courseId}/${reviewId}`
    );
  }
}

export default new CartApi();
