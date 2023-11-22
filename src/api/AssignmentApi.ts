import Api from "./apiConfigs";

class AssignmentApi {
  endPoints = {
    createAssignment: "/assignment/create/",
    getAllAssignmentByCourse: "/assignment/all/course/",
    getSubmittedAssignment: "/assignment/submit/details/",
  };
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
    const url = `${this.endPoints.getSubmittedAssignment}${courseId}/${assignmentId}`;
    return await Api?.http?.get(url);
  }
}

export default new AssignmentApi();
