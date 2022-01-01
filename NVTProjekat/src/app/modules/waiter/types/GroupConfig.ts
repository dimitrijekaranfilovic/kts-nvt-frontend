import { Observable } from "rxjs";

export interface GroupConfig {
    config: Observable<any>;
    tableConfig: Observable<any>;
    numberConfig: Observable<any>
}