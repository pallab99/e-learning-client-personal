import Api from "./apiConfigs";

class QuizApi {
  endPoints = {
    createQuiz: "/quiz/create/",
    updateQuiz: "/quiz/update/",
  };
  async createQuiz(data: any) {
    return await Api?.http?.post(this.endPoints.createQuiz, data);
  }
  async updateQuiz(quizId: string | undefined, quizData: any) {
    const url = `${this.endPoints.updateQuiz}${quizId}`;
    return await Api.http?.patch(url, quizData);
  }
}

export default new QuizApi();
