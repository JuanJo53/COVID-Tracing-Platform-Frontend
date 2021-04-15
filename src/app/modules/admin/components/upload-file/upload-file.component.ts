import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @Input() depto: string;
  @Input() municipality: boolean;

  files = [];
  fileName: string;

  constructor(private fileUploadService: FileService) {}

  ngOnInit(): void {}
  onClick() {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        // this.fileName = file.name + ' is uploaded';
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file, this.depto);
    });
  }
  uploadFile(file, depto: string) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    if (this.municipality) {
      this.fileUploadService.upload(formData, depto, true).subscribe(
        (rsp) => {
          console.log(rsp);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('mandando deptop');
      this.fileUploadService.upload(formData, depto, false).subscribe(
        (rsp) => {
          console.log(rsp);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
