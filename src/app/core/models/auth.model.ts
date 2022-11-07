export class UserInterfaceStateModel {
    encrypted_Name!: string | undefined;
    encrypted_UserID!: string | undefined;
    decrypted_Name!:string | undefined;
    decrypted_UserID!: string | undefined;
    token!: string | undefined;
}

export interface User {
    Name:string;
    UserID:string;
}

