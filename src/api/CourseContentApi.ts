import Api from "./apiConfigs";

class CourseContentApi {
  endPoints = {
    createCourseContent: "/course-content/create/",
  };
  async createCourseContent(
    courseId: string | undefined,
    sectionId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.createCourseContent}${courseId}/${sectionId}`;
    return await Api?.http?.post(url, data);
  }
}

export default new CourseContentApi();
