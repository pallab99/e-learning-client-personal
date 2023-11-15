import Api from "./apiConfigs";

class CartApi {
  endPoints = {
    cartByUser: "/cart/details",
    removeCourseFromCart: "/cart/update",
    // rejectSubscription: "/subscription/reject-subscription",
  };
  async getCartDataByUser() {
    return await Api?.http?.get(this.endPoints.cartByUser);
  }
  async removeCourseFromCart(courseId: string) {
    return await Api.http?.patch(this.endPoints.removeCourseFromCart, {
      courseId,
    });
  }
}

export default new CartApi();
