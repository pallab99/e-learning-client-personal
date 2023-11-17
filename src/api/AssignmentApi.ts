import Api from "./apiConfigs";

class AssignmentApi {
  endPoints = {
    createAssignment: "/assignment/create/",
  };
  async createAssignment(
    courseId: string | undefined,
    sectionId: string | undefined,
    data: any
  ) {
    const url = `${this.endPoints.createAssignment}${courseId}/${sectionId}`;
    return await Api?.http?.post(url, data);
  }
}

export default new AssignmentApi();
