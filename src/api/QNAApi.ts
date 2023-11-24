import Api from "./apiConfigs";

class CartApi {
  endPoints = {
    getAllQNAOfACourse: "/qna/all/details/",
    addQNA: "/qna/create/question",
    replyToQNA: "/qna/update/question/reply/",
    updateQNA: "/qna/update/question/",
    deleteQuestion: "/qna/delete/question/",
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

  async updateQNA(courseId: string, questionId: string, data: any) {
    return await Api.http?.patch(
      `${this.endPoints.updateQNA}${courseId}/${questionId}`,
      data
    );
  }
  async deleteQuestion(courseId: string, qnaId: string, questionId: string) {
    return await Api.http?.delete(
      `${this.endPoints.deleteQuestion}${courseId}/${qnaId}/${questionId}`
    );
  }
}

export default new CartApi();
