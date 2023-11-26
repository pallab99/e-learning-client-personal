import Api from './apiConfigs';

class AssignmentApi {
  endPoints = {
    createAssignment: '/assignment/create/',
    updateAssignment: '/assignment/update/',
    getAllAssignmentByCourse: '/assignment/all/course/',
    getSubmittedAssignment: '/assignment/submit/details/',
    getUserSubmittedAssignment: '/assignment/submit/user/',
    getAllSubmittedAssignmentOfASection: '/assignment/submit/details/',
    getAssignment: '/assignment/details/course/section/assignment/',
    submitAssignment: '/assignment/submit/',
    giveAssessment: '/assignment/assessment/create/',
    disableAssignment: '/assignment/disable/',
  };
  async updateAssignment(
    courseId: string | undefined,
    sectionId: string | undefined,
    assignmentId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.updateAssignment}${courseId}/${sectionId}/${assignmentId}`;
    return await Api?.http?.patch(url, data);
  }
  async createAssignment(
    courseId: string | undefined,
    sectionId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.createAssignment}${courseId}/${sectionId}`;
    return await Api?.http?.post(url, data);
  }
  async getAllAssignmentByCourse(courseId: string | undefined) {
    const url = `${this.endPoints.getAllAssignmentByCourse}${courseId}`;
    return await Api?.http?.get(url);
  }

  async getAllSubmittedAssignment(
    courseId: string | undefined,
    assignmentId: string | undefined
  ) {
    const url = `${this.endPoints.getUserSubmittedAssignment}${courseId}/${assignmentId}`;
    return await Api?.http?.get(url);
  }
  async getAllSubmittedAssignmentOfASection(
    courseId: string | undefined,
    assignmentId: string | undefined
  ) {
    const url = `${this.endPoints.getAllSubmittedAssignmentOfASection}${courseId}/${assignmentId}`;
    return await Api?.http?.get(url);
  }

  async getAssignmentBySectionId(
    courseId: string | undefined,
    sectionId: string | undefined,
    assignmentId: string | undefined
  ) {
    const url = `${this.endPoints.getAssignment}${courseId}/${sectionId}/${assignmentId}`;
    return await Api?.http?.get(url);
  }
  async submitAssignment(
    courseId: string | undefined,
    sectionId: string | undefined,
    assignmentId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.submitAssignment}${courseId}/${sectionId}/${assignmentId}`;
    return await Api?.http?.post(url, data);
  }

  async giveAssessment(
    assignmentId: string | undefined,
    submittedAssignmentId: string | undefined,
    grade: any
  ) {
    const url = `${this.endPoints.giveAssessment}${assignmentId}/${submittedAssignmentId}`;
    return await Api?.http?.patch(url, { grade });
  }

  async disableAssignment(
    courseId: string | undefined,
    sectionId: string | undefined,
    assignmentId: string | undefined
  ) {
    const url = `${this.endPoints.disableAssignment}${courseId}/${sectionId}/${assignmentId}`;
    return await Api.http?.delete(url);
  }
}

export default new AssignmentApi();
