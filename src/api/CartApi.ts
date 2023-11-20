import Api from "./apiConfigs";

class CartApi {
  endPoints = {
    cartByUser: "/cart/details",
    removeCourseFromCart: "/cart/update",
    addToCart: "/cart/create",
  };
  async getCartDataByUser() {
    return await Api?.http?.get(this.endPoints.cartByUser);
  }
  async removeCourseFromCart(courseId: string) {
    return await Api.http?.patch(this.endPoints.removeCourseFromCart, {
      courseId,
    });
  }
  async addToCart(courseId: string | undefined) {
    return await Api.http?.post(this.endPoints.addToCart, { courseId });
  }
}

export default new CartApi();
