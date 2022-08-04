import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Server } from '../../model/server'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Update } from 'src/app/model/update';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {

  displayedColumns: string[] = ['kb','tittle', 'categories', 'actions'];
  dataSource: MatTableDataSource<Update>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  server: Server;
  public showOverlay = true; 

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.readServer(id)
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(){
    
    setTimeout(() => {
      this.showOverlay = false; 
   }, 250);
  }

  readServer(id: any) {
    this.apiService.getServer(id).subscribe((data) => {
      this.server = data;
      this.dataSource = new MatTableDataSource(data.updates);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
