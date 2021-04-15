import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() depto: Department;
  @Input() displayedColumns: [];
  data: Department[];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 20;
  size = 10;
  order = 'id';
  asc = true;
  actualPage = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<Department>;

  constructor(private deptoService: DepartmentService) {}
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.fectchCumulativeData();
    this.refreshData();
  }
  // ngAfterViewInit(): void {
  //   this.dataSource = new MatTableDataSource(this.data);
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   // this.table.dataSource = this.dataSource;
  // }
  refreshData(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  fectchHistoricData(): void {
    this.deptoService
      .getDepartmentHistoricData(this.depto.iso, this.actualPage, this.size)
      .subscribe((data) => {
        this.data = data;
        this.refreshData();
      });
  }
  fectchCumulativeData(): void {
    this.deptoService
      .getDepartmentAcumulativeData(this.depto.iso, this.actualPage, this.size)
      .subscribe((data) => {
        this.data = data;
        this.refreshData();
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
