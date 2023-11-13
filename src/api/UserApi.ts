import Api from './apiConfigs';

class AuthApi {
  endPoints = {
    allInstructor: '/user/instructor/all',
    profile: '/user/me',
    allStudents: '/user/students/all',
    updateUser: '/user/update',
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
}

export default new AuthApi();
