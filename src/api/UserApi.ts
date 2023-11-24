import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    allInstructor: "/user/instructor/all",
    profile: "/user/me",
    allStudents: "/user/students/all",
    updateUser: "/user/update",
    updateDp: "/user/update-DP",
    getMyLearning: "/user/students/my-learning",
  };
  async myProfile() {
    return await Api?.http?.get(this.endPoints.profile);
  }
  async getAllStudent() {
    return await Api?.http?.get(this.endPoints.allStudents);
  }
  async getAllInstructor() {
    return await Api?.http?.get(this.endPoints.allInstructor);
  }
  async updateUser(data: any) {
    return await Api?.http?.patch(this.endPoints.updateUser, data);
  }
  async updateDp(data: any) {
    return await Api?.http?.patch(this.endPoints.updateDp, data);
  }

  async getMyLearning() {
    return await Api?.http?.get(this.endPoints.getMyLearning);
  }
}

export default new AuthApi();
