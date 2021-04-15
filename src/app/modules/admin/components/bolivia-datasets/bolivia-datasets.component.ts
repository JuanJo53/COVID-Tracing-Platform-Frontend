import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FileRequest } from 'src/app/shared/models/file-request';

@Component({
  selector: 'app-bolivia-datasets',
  templateUrl: './bolivia-datasets.component.html',
  styleUrls: ['./bolivia-datasets.component.scss'],
})
export class BoliviaDatasetsComponent implements OnInit {
  data: FileRequest[];
  displayedColumns: ['id', 'url', 'date'];
  @Input() depto: string;

  isLoadingResults = true;
  isRateLimitReached = false;
  panelOpenState = false;

  length = 20;
  size = 5;
  order = 'id';
  asc = true;
  actualPage = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<FileRequest>;

  constructor() {}
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    console.log(this.depto);
    this.fectchData();
  }
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
  fectchData(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}