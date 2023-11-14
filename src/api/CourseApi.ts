import Api from './apiConfigs';

class CourseApi {
  endPoints = {
    getAllCourse: '/course/all',
    courseByInstructor: '/course/all/instructor',
    coursePublishRequest: '/course/publish-request',
  };
  async getCourseByInstructor() {
    return await Api?.http?.get(this.endPoints.courseByInstructor);
  }
  async getAllCourseAdmin(selectFieldData: any) {
    let url = this.endPoints.getAllCourse;
    if (selectFieldData.type && selectFieldData.value) {
      url += `?type=${selectFieldData.type}&value=${selectFieldData.value}`;
    } else if (selectFieldData.type) {
      url += `?type=${selectFieldData.type}`;
    }
    return await Api?.http?.get(url);
  }

  async coursePublishRequest(courseId: string, type: string) {
    const url = `${this.endPoints.coursePublishRequest}/${courseId}?type=${type}`;
    return await Api?.http?.post(url);
  }
}

export default new CourseApi();
