import { Component, OnInit, Inject } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Server } from '../../model/server'
import { ApiService } from './../../service/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component.html',
  styleUrls: ['./servers-list.component.css']
})

export class ServerListComponent implements OnInit {
  displayedColumns: string[] = ['hostName', 'version', 'updates', 'actions'];
  dataSource: MatTableDataSource<Server>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public showOverlay = true;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) {
    this.apiService.getServers().subscribe((data) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {

    setTimeout(() => {
      this.showOverlay = false;
    }, 250);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(server: Server) {
    this.dialog.open(TableDialog, {
      data: {
        hostName: server.hostName,
        nodeName: server.nodeName,
        version: server.version,
        updates: server.updates
      },
    });
  }
}

@Component({
  selector: 'table-dialog',
  templateUrl: 'table-dialog.html',
})
export class TableDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Server) { }
}

