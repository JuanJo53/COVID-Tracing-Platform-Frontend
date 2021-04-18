import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Bolivia } from 'src/app/shared/models/bolivia';
import { Department } from 'src/app/shared/models/department';
import { DepartmentList } from 'src/app/shared/models/department-list';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() bolivia: Bolivia;
  @Input() depto: Department;
  @Input() displayedColumns: [];
  data: DepartmentList[];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 12;
  size = 30;
  order = 'id';
  asc = true;
  actualPage = 0;

  dataType = 'acumulated';

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<Department>;

  constructor(private deptoService: DepartmentService) {}
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.deptoService
      .getDepartmentTotalData(this.depto.iso)
      .subscribe((result) => {
        this.length = result;
        console.log(this.length);
      });
    this.fectchCumulativeData(1);
  }
  fectchHistoricData(page: number): void {
    this.isLoadingResults = true;
    this.deptoService
      .getDepartmentHistoricData(this.depto.iso, page, this.size)
      .subscribe((data) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

        this.isLoadingResults = false;
      });
  }
  fectchCumulativeData(page: number): void {
    this.isLoadingResults = true;
    this.deptoService
      .getDepartmentAcumulativeData(this.depto.iso, page, this.size)
      .subscribe((data) => {
        console.log(data);
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

        this.isLoadingResults = false;
      });
  }
  refreshPage(event) {
    this.actualPage = event.pageIndex;
    if (this.dataType == 'acumulated') {
      this.fectchCumulativeData(event.pageIndex + 1);
    } else {
      this.fectchHistoricData(event.pageIndex + 1);
    }
  }
  refreshDataType() {
    if (this.dataType == 'acumulated') {
      this.fectchCumulativeData(this.actualPage + 1);
    } else {
      this.fectchHistoricData(this.actualPage + 1);
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
