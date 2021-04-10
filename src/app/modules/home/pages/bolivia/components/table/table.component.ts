import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  deptos: Department[] = [
    { name: 'Hydrogen', description: 'HOLA' },
    { name: 'Helium', description: 'HOLo' },
    { name: 'Lithium', description: 'HOLi' },
    { name: 'Beryllium', description: 'HOLi' },
    { name: 'Boron', description: 'HOLi' },
    { name: 'Carbon', description: 'HOLi' },
    { name: 'Nitrogen', description: 'HOLi' },
    { name: 'Oxygen', description: 'HOLi' },
    { name: 'Fluorine', description: 'HOLi' },
    { name: 'Sodium', description: 'HOLi' },
    { name: 'Magnesium', description: 'HOLi' },
    { name: 'Aluminum', description: 'HOLi' },
    { name: 'Silicon', description: 'HOLi' },
    { name: 'Phosphoru', description: 'HOLi' },
    { name: 'Sulfur', description: 'HOLi' },
    { name: 'Chlorine', description: 'HOLi' },
    { name: 'Argon', description: 'HOLi' },
    { name: 'Potassium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
  ];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 20;
  size = 5;
  order = 'id';
  asc = true;
  actualPage = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<Department>;

  displayedColumns = ['id', 'name'];
  // dataSource: Department;

  constructor() {}
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    // this.fectchData();
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.deptos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
  fectchData() {
    this.dataSource = new MatTableDataSource(this.deptos);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
