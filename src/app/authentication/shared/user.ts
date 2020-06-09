export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    //esto es agregado...ver 
    token?: string;
    phoneNumber?: string;
    username: string;
    firstName?: string;
    lastName?: string;
    roles: Roles;
}



export interface Roles {
    editor?: boolean;
    admin?: boolean;
  }