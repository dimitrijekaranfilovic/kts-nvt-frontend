import { Observable } from "rxjs";
import { Table } from "./Table";

export interface GroupConfig {
    config: Observable<any>;
    tableConfig: Observable<any>;
    numberConfig: Observable<any>;
    table: Table;
}