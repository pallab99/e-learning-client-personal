import Api from './apiConfigs';

class CourseSectionApi {
  endPoints = {
    createSection: '/course-section/create/',
    getCourseSection: '/course-section/getSectionCourseById/',
    updateCourseSection: '/course-section/update/',
    changeVisibility: '/course-section/change-visibility/',
  };
  async createSection(courseId: string | undefined, data: any) {
    const url = `${this.endPoints.createSection}${courseId}`;
    return await Api?.http?.post(url, data);
  }
  async updateSection(
    courseId: string | undefined,
    courseSectionId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.updateCourseSection}${courseId}/${courseSectionId}`;
    return await Api?.http?.patch(url, data);
  }
  async getCourseSection(courseId: string | undefined) {
    const url = `${this.endPoints.getCourseSection}${courseId}`;
    return await Api?.http?.get(url);
  }

  async changeCourseSectionVisibility(
    courseId: string | undefined,
    sectionId: string | undefined,
    type: string
  ) {
    console.log('type', type);

    const url = `${this.endPoints.changeVisibility}${courseId}/${sectionId}?type=${type}`;
    return await Api?.http?.patch(url);
  }
}

export default new CourseSectionApi();
