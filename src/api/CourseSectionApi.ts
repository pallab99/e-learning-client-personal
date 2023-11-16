import Api from "./apiConfigs";

class CourseSectionApi {
  endPoints = {
    createSection: "/course-section/create/",
    getCourseSection: "/course-section/getSectionCourseById/",
  };
  async createSection(courseId: string | undefined, data: any) {
    const url = `${this.endPoints.createSection}${courseId}`;
    return await Api?.http?.post(url, data);
  }
  async getCourseSection(courseId: string | undefined) {
    const url = `${this.endPoints.getCourseSection}${courseId}`;
    return await Api?.http?.get(url);
  }
}

export default new CourseSectionApi();
