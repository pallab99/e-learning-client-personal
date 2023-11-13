export interface IUserLoginData {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  rank: number;
  accessToken: string;
  refreshToken: string;
}
export interface IUserUpdateData {
  name: string;
  email: string;
  bio: string;
  heading: string;
  website: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  youtube: string;
}
