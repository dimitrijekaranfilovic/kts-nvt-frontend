import { Component, Input, OnInit } from '@angular/core';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-section-tab',
  templateUrl: './section-tab.component.html',
  styleUrls: ['./section-tab.component.scss']
})
export class SectionTabComponent implements OnInit {
  @Input()
  section!: ReadSectionResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
