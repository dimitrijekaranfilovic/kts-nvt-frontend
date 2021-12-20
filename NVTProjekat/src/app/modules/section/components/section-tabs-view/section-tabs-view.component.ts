import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { SectionService } from '../../services/section-service/section.service';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';
import { CreateUpdateSectionDialogComponent } from '../create-update-section-dialog/create-update-section-dialog.component';

@Component({
  selector: 'app-section-tabs-view',
  templateUrl: './section-tabs-view.component.html',
  styleUrls: ['./section-tabs-view.component.scss']
})
export class SectionTabsViewComponent implements OnInit {
  sections: ReadSectionResponse[] = [];
  selected = new FormControl(0);

  constructor(
    private sectionService: SectionService,
    private dialogService: MatDialog,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.sectionService.read().subscribe(response => {
      this.sections = response;
    })
  }

  onCreateSection(): void {
    this.dialogService.open(CreateUpdateSectionDialogComponent, {
      data: {
        id: 0, name: ''
      }
    }).componentInstance.onSaveChanges.subscribe(request => {
      this.sectionService.create(request).subscribe({
        next: response => {
          this.sections.push({
            ...request, ...response
          });
          this.selected.setValue(this.sections.length - 1);
        },
        error: err => this.errorService.handle(err)
      })
    });
  }

  removeTab(index: number): void {
    this.sections.splice(index, 1);
  }

}
