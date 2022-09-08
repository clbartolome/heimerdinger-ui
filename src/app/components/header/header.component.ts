import { Component, OnInit, Inject } from '@angular/core';

import { Server } from '../../model/server'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../../providers/app-config.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  

  constructor(
    public dialog: MatDialog,
    private config: AppConfigService,) {
  }

  ngOnInit(): void {

  }

  openDialog() {
    this.dialog.open(TableDialog, {
      data: {
        appVersion: this.config.getInfo().appVersion,
        chart: this.config.getInfo().chartInfo
      },
    });
  }
}

@Component({
  selector: 'table-dialog',
  templateUrl: 'about.html',
})
export class TableDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

