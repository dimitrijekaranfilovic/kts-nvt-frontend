import {
  ApplicationRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';
import { Table } from '../../types/Table';
import { TableOrder } from '../../types/TableOrder';
import { WebSocketService } from 'src/app/modules/shared/services/webSocketService/web-socket.service';
import { GroupConfig } from '../../types/GroupConfig';
import { Circle } from 'konva/lib/shapes/Circle';
import { WaiterSectionServiceService } from '../../services/waiter-section-service.service';
import { Vector2d } from 'konva/lib/types';

@Component({
  selector: 'app-section-tables-view',
  templateUrl: './section-tables-view.component.html',
  styleUrls: ['./section-tables-view.component.scss'],
  providers: [WebSocketService]
})
export class SectionTablesViewComponent implements OnInit, OnDestroy {
  @ViewChild('stage') stage!: KonvaComponent;
  @ViewChild('layer') layer!: KonvaComponent;

  @Input() tables: Table[] | undefined = [];
  @Input() sectionId!: number;
  @Input() draggable?: boolean;
  @Output() tableClicked: EventEmitter<TableOrder> = new EventEmitter<TableOrder>();

  public width = 1200;
  public height = 720;
  public groups: GroupConfig[] = [];

  public configStage: Observable<any> = of({
    width: this.width,
    height: this.height,
  });

  relativeCursorPosition: Vector2d = { x: 0, y: 0 };

  constructor(
    private ref: ApplicationRef,
    private socketService: WebSocketService,
    private sectionService: WaiterSectionServiceService
  ) { }

  ngOnInit(): void {
    this.initSockets();
    this.populateScene();
  }

  ngOnDestroy(): void {
    try {
      this.socketService.disconnect();
    } catch {
      console.log("WS connection interrupted.")
    }
  }

  onDragEnd(table: Table): void {
    const newCursorPosition = this.getCursorPosition();
    const dx = newCursorPosition.x - this.relativeCursorPosition.x;
    const dy = newCursorPosition.y - this.relativeCursorPosition.y;
    console.log(table);
    console.log(dx);
    console.log(dy);
    this.sectionService.moveTable(this.sectionId, table.id, {
      newX: table.x + dx,
      newY: table.y + dy
    }).subscribe({
      next: () => {
        table.x += dx;
        table.y += dy;
      },
      error: () => window.location.reload()
    })
  }

  onDragStart(_: Table): void {
    this.relativeCursorPosition = this.getCursorPosition();
  }

  findTableShape(id: number | string): Circle {
    const stage = this.stage.getStage();
    stage.draw();
    return stage.find(`.table_${id}`)[0];
  }

  redraw(): void {
    const stage = this.stage.getStage();
    this.ref.tick();
    stage.draw();
    stage.batchDraw();
  }

  onClick(table: Table): void {
    const tableOrder: TableOrder = {
      tableAvailable: table.available,
      tableId: table.id,
      tableNumber: table.number,
    };

    this.tableClicked.emit(tableOrder);
    this.redraw();
  }

  getCursorPosition(): Vector2d {
    return this.stage.getStage().getRelativePointerPosition();
  }

  populateScene(): void {
    this.groups = [];
    this.tables?.forEach((table) => {
      let x = table.x;
      let y = table.y;
      const tableConfig = of({
        x: x,
        y: y,
        radius: table.r,
        fill: table.available ? 'green' : 'red',
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0.8,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowOpacity: 0.6,
        name: `table_${table.id}`,
        fillAfterStrokeEnabled: true,
      })
      const numberConfig = of({
        x: x - 10,
        y: y - 10,
        text: `${table.number}`,
        fontSize: 35,
        fontFamily: 'Calibri',
        fill: '#ffffff',
        width: 40,
        height: 40,
        name: `number_${table.id}`,
      });
      const group = of({
        x: x,
        y: y,
        draggable: this.draggable && table.available,
        listening: true,
      })
      this.groups.push({
        config: group,
        tableConfig: tableConfig,
        numberConfig: numberConfig,
        table: table
      });
    });
  }

  initSockets(): void {
    this.socketService.initializeWebSocketConnection();
    this.socketService
      .getEmitter()
      .subscribe((message) => {
        const stage = this.stage.getStage();
        const element = this.findTableShape(message.fromId);
        if (element) {
          element.attrs.fill = "purple";
          stage.draw();
        }
      });
  }
}
