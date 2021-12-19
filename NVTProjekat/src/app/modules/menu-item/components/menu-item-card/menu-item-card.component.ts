import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../types/MenuItem';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {
  @Input() menuItem!: MenuItem;

  constructor() {}

  ngOnInit(): void {}
}
