import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/authentication/token.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  constructor(public tokenService: TokenService) {}

  ngOnInit(): void {
    getShortBio();
  }

}
function getShortBio() {
  value:'aqsxdcfvghbjnkm';
  throw new Error('Function not implemented.');
}

