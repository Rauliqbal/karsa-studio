export interface AdminUserInput {
  name: string
  email:string
  password:string
  confirmPassword:string
  role?:string
  verified?: boolean
}

export interface AdminUserResponse {
  name: string
  email:string
  password:string
  role?:string
  verified?: boolean
    createdAt: Date;
  updatedAt: Date;
}
