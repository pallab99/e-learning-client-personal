import Api from "./apiConfigs";

class CourseApi {
  endPoints = {
    getAllCourse: "/course/all",
    courseByInstructor: "/course/all/instructor",
    coursePublishRequest: "/course/publish-request",
    createCourse: "/course/create",
    uploadPromoVideo: "/course/upload/demoVideo/6554f0c725b550d271b1e012",
    getCourseById: "/course/getCourseById/",
    updateCourseById: "/course/update/",
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
  async createCourse(data: any) {
    return await Api?.http?.post(this.endPoints.createCourse, data);
  }
  async uploadPromoVideo(data: any) {
    // const dispatch=useAppDispatch()
    // return await Api.http?.patch(this.endPoints.uploadPromoVideo, data,{
    //   onUploadProgress: (progressEvent:any) => {
    //     const percentCompleted = Math.floor((progressEvent?.loaded * 100) / progressEvent?.total);
    //     dispatch(setProgress({ fileId: 'yourFileId', progress: percentCompleted }))
    //   })
  }

  async getCourseById(courseId: string) {
    const url = `${this.endPoints.getCourseById}${courseId}`;
    return await Api?.http?.get(url);
  }

  async updateCourseById(courseId: string, data: any) {
    const url = `${this.endPoints.updateCourseById}${courseId}`;
    return await Api?.http?.patch(url, data);
  }
}

export default new CourseApi();
