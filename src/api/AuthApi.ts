import { ILogin } from "../types/loginData";
import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    verifyAccount: "/auth/verify-account",
    logOut: "/auth/logOut",
    resetPasswordRequest: "/auth/sendEmailForResetPassword",
    resetPassword: "/auth/reset-password",
  };
  async signIn(data: ILogin) {
    return await Api?.http?.post(this.endPoints.signIn, data);
  }
  async signUp(data: any) {
    return await Api?.http?.post(this.endPoints.signUp, data);
  }

  async verifyAccount(data: any) {
    return await Api?.http?.post(this.endPoints.verifyAccount, data);
  }
  async logOut() {
    return await Api?.http?.delete(this.endPoints.logOut);
  }

  async sendResetPasswordRequest(data: any) {
    return await Api?.http?.post(this.endPoints.resetPasswordRequest, data);
  }
  async resetPassword(data: any) {
    return await Api?.http?.post(this.endPoints.resetPassword, data);
  }
}

export default new AuthApi();
