import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  roles: string[];
  private userRole = new BehaviorSubject<string[]>([]);

  role$ = this.userRole.asObservable();
  constructor(private tokenService: TokenService) {}

  setUserRole() {
    this.roles = this.tokenService.getAuthorities();
    this.userRole.next(this.roles);
  }
}
