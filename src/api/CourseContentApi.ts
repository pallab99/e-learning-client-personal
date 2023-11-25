import Api from './apiConfigs';

class CourseContentApi {
  endPoints = {
    createCourseContent: '/course-content/create/',
    updateCourseContent: '/course-content/update/',
    deleteContent: '/course-content/disable/',
  };
  async createCourseContent(
    courseId: string | undefined,
    sectionId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.createCourseContent}${courseId}/${sectionId}`;
    return await Api?.http?.post(url, data);
  }

  async updateCourseContent(contentId: string | undefined, data: any) {
    console.log('api cntent id', contentId);

    const url = `${this.endPoints.updateCourseContent}${contentId}`;
    return await Api.http?.patch(url, data);
  }
  async deleteContent(contentId: string | string) {
    const url = `${this.endPoints.deleteContent}${contentId}`;
    return await Api.http?.patch(url);
  }
}

export default new CourseContentApi();
