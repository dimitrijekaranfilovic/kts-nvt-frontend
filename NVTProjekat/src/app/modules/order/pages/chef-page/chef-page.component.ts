import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PinModalComponent } from '../../components/pin-modal/pin-modal.component';

@Component({
  selector: 'app-chef-page',
  templateUrl: './chef-page.component.html',
  styleUrls: ['./chef-page.component.scss']
})
export class ChefPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
