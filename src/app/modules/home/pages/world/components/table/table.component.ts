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
import { CountryService } from 'src/app/core/http/country.service';
import { CountryList } from 'src/app/shared/models/country-list';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: [];
  data: CountryList[];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 20;
  size = 10;
  order = 'id';
  asc = true;
  actualPage = 0;

  dataType = 'acumulated';

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<Department>;

  // dataSource: Department;

  constructor(private worldService: CountryService) {}
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.worldService.getWorldTotalData().subscribe((result) => {
      this.length = result;
    });
    this.fectchCumulativeData(1);
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
  fectchHistoricData(page: number): void {
    this.isLoadingResults = true;
    this.worldService
      .getHistoricDataCountries(page, this.size)
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
    this.worldService
      .getCumulativeDataCountries(page, this.size)
      .subscribe((data) => {
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
