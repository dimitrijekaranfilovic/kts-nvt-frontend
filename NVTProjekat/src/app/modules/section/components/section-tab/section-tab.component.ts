import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-section-tab',
  templateUrl: './section-tab.component.html',
  styleUrls: ['./section-tab.component.scss']
})
export class SectionTabComponent implements OnInit {
  @Input()
  section!: ReadSectionResponse;
  @Output()
  onUpdateSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSection(): void {
    this.onUpdateSection.emit(this.section);
  }

}
