export interface CreateSuperUserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    type: string;
    salary: number;
}