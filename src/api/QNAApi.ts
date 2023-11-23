import Api from "./apiConfigs";

class CartApi {
  endPoints = {
    getAllQNAOfACourse: "/qna/all/details/",
    addQNA: "/qna/create/question",
    replyToQNA: "/qna/update/question/reply/",
  };
  async getAllQNAOfACourse(courseId: string) {
    return await Api?.http?.get(
      `${this.endPoints.getAllQNAOfACourse}${courseId}`
    );
  }
  async addQNA(data: any) {
    return await Api?.http?.post(this.endPoints.addQNA, data);
  }
  async replyToQNA(questionId: string, data: any) {
    return await Api.http?.patch(
      `${this.endPoints.replyToQNA}${questionId}`,
      data
    );
  }
}

export default new CartApi();
