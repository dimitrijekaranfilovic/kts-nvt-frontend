import {
  ApplicationRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';
import { Table } from '../../types/Table';
import { TableOrder } from '../../types/TableOrder';

@Component({
  selector: 'app-section-tables-view',
  templateUrl: './section-tables-view.component.html',
  styleUrls: ['./section-tables-view.component.scss'],
})
export class SectionTablesViewComponent implements OnInit {
  @ViewChild('stage') stage!: KonvaComponent;
  @ViewChild('layer') layer!: KonvaComponent;
  @ViewChild('dragLayer') dragLayer!: KonvaComponent;

  @Input() tables: Table[] | undefined = [];
  @Input() sectionId!: number;
  @Input() draggable?: boolean;
  @Output() onTableClicked: EventEmitter<TableOrder> =
    new EventEmitter<TableOrder>();

  public width = 1200;
  public height = 720;
  public list: Array<any> = [];
  public listNum: Array<any> = [];

  public configStage: Observable<any> = of({
    width: this.width,
    height: this.height,
  });

  constructor(private ref: ApplicationRef) {}

  public ngOnInit() {
    this.list = [];
    this.tables?.forEach((table) => {
      let x = table.x;
      let y = table.y;
      this.list.push(
        new BehaviorSubject({
          x: x,
          y: y,
          radius: 50,
          fill: table.available ? 'green' : 'red',
          stroke: 'black',
          strokeWidth: 4,
          opacity: 0.8,
          draggable: this.draggable,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          shadowOpacity: 0.6,
          name: '' + table.id,
          id: '' + table.id,
          fillAfterStrokeEnabled: true,
          listening: true,
        })
      );
      this.listNum.push(
        new BehaviorSubject({
          x: x - 10,
          y: y - 10,
          text: table.number,
          fontSize: 35,
          fontFamily: 'Calibri',
          fill: '#ffffff',
          width: 40,
          height: 40,
          name: '' + table.id,
          id: '' + table.id,
        })
      );
    });
  }

  onClick(event: any) {
    let tableId = Number(event.cacheProps.name);
    const stage = this.stage.getStage();
    const table = this.tables?.find((table) => table.id === tableId);

    const tableOrder: TableOrder = {
      tableAvailable: table?.available,
      tableId: tableId,
    };
    this.onTableClicked.emit(tableOrder);

    this.ref.tick();
    stage.draw();
    stage.batchDraw();
  }
}