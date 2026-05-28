export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  name: string
}

export type UsersDTO = {
  id : number;
  employee_Name : string;
  company_Code : string;
  user_Code : string;
  email? : string;
  employee_Code : string;
  user_Password : string;
  state : boolean;
  validateAD?: boolean;
  modified_By? : string;
  modification_Date? : string | Date;
  create_By : string;
  creation_Date : string | Date;
  theme: string;
}

export type MenuDTO = {
  Id: number;
  Code: string;
  Name: string;
  Description: string;
  Identificator: string;
  Icon: string;
  Parent_Id: number;
  MenuOrder: number;
  Status_Code: string;
  User_Code: string;
  children?: any;
};