export interface User {
    username: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN = "admin",
    GUEST = "guest"
}