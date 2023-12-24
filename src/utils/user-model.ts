export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  address: string;
  profession: string;
  role: string;
}

export interface UserAuthModel extends UserModel {
  authorized: boolean | null;
}
