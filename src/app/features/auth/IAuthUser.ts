import { AuthRole } from "./AuthRole";
export interface IAuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: AuthRole;
}
