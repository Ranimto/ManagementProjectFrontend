export interface RegisterRequest {
    firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  phone?:String;
  position?:String;
  imageURL?:String;
  role?: string;
  tfaEnbled?: string;
}
