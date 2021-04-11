import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-client-datasets',
  templateUrl: './client-datasets.component.html',
  styleUrls: ['./client-datasets.component.scss'],
})
export class ClientDatasetsComponent implements OnInit {
  constructor(private downloadService: FileUploadService) {}

  ngOnInit(): void {}
  onClick() {
    this.downloadService.download().subscribe((result) => {
      console.log(result);
    });
  }
}
