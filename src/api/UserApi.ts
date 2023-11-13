import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    verifyAccount: "/auth/verify-account",
    logOut: "/auth/logOut",
    resetPasswordRequest: "/auth/sendEmailForResetPassword",
    resetPassword: "/auth/reset-password",
    profile: "/user/me",
    allStudents: "/user/students/all",
  };
  async myProfile() {
    return await Api?.http?.get(this.endPoints.profile);
  }
  async getAllStudent() {
    return await Api?.http?.get(this.endPoints.allStudents);
  }
}

export default new AuthApi();
