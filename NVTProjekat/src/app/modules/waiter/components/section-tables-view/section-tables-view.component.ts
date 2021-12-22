import { AfterViewInit, ApplicationRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';
import Konva from 'konva';
import { Table } from '../../types/Table';
import { WaiterSectionServiceService } from '../../services/waiter-section-service.service';

@Component({
  selector: 'app-section-tables-view',
  templateUrl: './section-tables-view.component.html',
  styleUrls: ['./section-tables-view.component.scss']
})
export class SectionTablesViewComponent implements OnInit{

  @ViewChild('stage') stage!: KonvaComponent;
  @ViewChild('layer') layer!: KonvaComponent;
  @ViewChild('dragLayer') dragLayer!: KonvaComponent;

  @Input() tables: Table[] | undefined= [];
  @Input() sectionId!: number;
  @Input() draggable?: boolean;
 
  public width = 1200;
  public height = 720;
  public list: Array<any> = [];
  public listNum: Array<any> = [];
 
  public configStage: Observable<any> = of({
    width: this.width,
    height: this.height
  });

  constructor(private sectionService: WaiterSectionServiceService, private ref: ApplicationRef) {}

  public ngOnInit(){
    this.list = []
    console.log("Stolovi:", this.tables)
     this.tables?.forEach((table)=>{
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
          listening: true
        })
      );
      this.listNum.push(new BehaviorSubject({
        x: x - 10,
        y: y - 10,
        text: table.number,
        fontSize: 35,
        fontFamily: 'Calibri',
        fill: '#ffffff',
        width: 40,
        height:40,
        name: '' + table.id,
        id: '' + table.id
      }));
     });
  }

  onClick(event: any) {
    console.log("Table " + event.cacheProps.name);
    let tableId = Number(event.cacheProps.name);
    const stage = this.stage.getStage();
    const table = this.tables?.find((table)=>table.id === tableId);
    if(table?.available){
      //TODO: posalji zahtjev na bekend da se kreira order, pa redirect na stranicu
    }
    else{
      //TODO: redirect na stranicu
    }
    // const element = stage.find("#"+event.cacheProps.id)[0];
    // if(element.attrs.fill === "green"){
    //   element.attrs.fill = "red";
    // } else {
    //   element.attrs.fill = "green";
    // }
    // this.list[event.cacheProps.id]._value.fill = "green"
    
    this.ref.tick();
    stage.draw();
    stage.batchDraw() 
  }

}
