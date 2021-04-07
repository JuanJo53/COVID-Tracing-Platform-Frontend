import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/authentication/token.service';
import { UserRoleService } from 'src/app/core/services/user-role.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userRole: string[];
  role$: Observable<string[]>;
  constructor(
    private tokenService: TokenService,
    private roleUserService: UserRoleService
  ) {
    this.role$ = this.roleUserService.role$;
  }

  ngOnInit(): void {
    this.userRole = this.tokenService.getAuthorities();
    console.log(this.userRole[0]);
  }
}
