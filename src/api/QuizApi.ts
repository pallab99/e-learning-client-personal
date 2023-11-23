import Api from "./apiConfigs";

class QuizApi {
  endPoints = {
    createQuiz: "/quiz/create/",
    updateQuiz: "/quiz/update/",
    submitQuiz: "/quiz-submit/submit/",
    getQuizById: "/quiz/details/",
    getSubmittedAssignment: "/quiz-submit/submitted-quiz/details/",
  };
  async createQuiz(data: any) {
    return await Api?.http?.post(this.endPoints.createQuiz, data);
  }
  async updateQuiz(quizId: string | undefined, quizData: any) {
    const url = `${this.endPoints.updateQuiz}${quizId}`;
    return await Api.http?.patch(url, quizData);
  }
  async getQuizById(sectionId: string | undefined, quizId: string | undefined) {
    const url = `${this.endPoints.getQuizById}${sectionId}/${quizId}`;
    return await Api.http?.get(url);
  }
  async submitQuiz(quizId: string | undefined, data: any) {
    const url = `${this.endPoints.submitQuiz}${quizId}`;
    return await Api.http?.post(url, data);
  }
  async getSubmittedQuiz(quizId: string | undefined) {
    const url = `${this.endPoints.getSubmittedAssignment}${quizId}`;
    return await Api.http?.get(url);
  }
}

export default new QuizApi();
