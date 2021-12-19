export interface AuthResponse {
    id: number;
    name: string;
    surname: string;
    jwt: string;
    authorities: string[];
}