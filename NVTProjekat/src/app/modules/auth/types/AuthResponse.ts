export interface AuthResponse {
    id: number;
    name: string;
    surname: string;
    email: string;
    jwt: string;
    authorities: string[];
}