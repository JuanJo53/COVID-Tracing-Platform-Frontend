import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-client-datasets',
  templateUrl: './client-datasets.component.html',
  styleUrls: ['./client-datasets.component.scss'],
})
export class ClientDatasetsComponent implements OnInit {
  constructor(private downloadService: FileService) {}

  ngOnInit(): void {}
  onClick() {
    this.downloadService.download().subscribe((result) => {
      console.log(result);
    });
  }
}
