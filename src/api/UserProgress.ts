import Api from "./apiConfigs";

class UserProgressApi {
  endPoints = {
    addToUserProgress: "/user-progress/create",
    getUserProgress: "/user-progress/student/details/",
  };
  async addToUserProgress(data: any) {
    return await Api?.http?.post(this.endPoints.addToUserProgress, data);
  }
  async getUserProgress(courseId: string) {
    return await Api?.http?.get(`${this.endPoints.getUserProgress}${courseId}`);
  }
}

export default new UserProgressApi();
