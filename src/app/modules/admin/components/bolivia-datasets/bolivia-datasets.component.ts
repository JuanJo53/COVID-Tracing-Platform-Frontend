import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataRequestService } from 'src/app/core/http/data-request.service';
import { FileRequest } from 'src/app/shared/models/file-request';

@Component({
  selector: 'app-bolivia-datasets',
  templateUrl: './bolivia-datasets.component.html',
  styleUrls: ['./bolivia-datasets.component.scss'],
})
export class BoliviaDatasetsComponent implements OnInit {
  @Input() depto: string;
  displayedColumns = ['id', 'region', 'username', 'date'];
  data: FileRequest[];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 12;
  size = 30;
  order = 'id';
  asc = true;
  actualPage = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dataRequestService: DataRequestService) {}

  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.depto = 'La Paz';
    this.dataRequestService.getBoliviaTotal().subscribe((result) => {
      this.length = result;
    });
    this.fectchData(1);
  }

  fectchData(page: number): void {
    this.isLoadingResults = true;
    this.dataRequestService
      .getBoliviaRequest(page, this.size)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;
      });
  }
  refreshPage(event) {
    this.actualPage = event.pageIndex;
    this.fectchData(event.pageIndex + 1);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
