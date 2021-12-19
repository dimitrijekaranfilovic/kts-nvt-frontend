export interface ReadSuperusersRequest {
    query?: string;
    salaryLowerBound?: number;
    salaryUpperBound?: number;
    type?: string;
}