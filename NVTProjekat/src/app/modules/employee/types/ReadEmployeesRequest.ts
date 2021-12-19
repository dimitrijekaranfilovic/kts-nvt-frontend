export interface ReadEmployeesRequest {
    query?: string;
    salaryLowerBound?: number;
    salaryUpperBound?: number;
    type?: string;
}