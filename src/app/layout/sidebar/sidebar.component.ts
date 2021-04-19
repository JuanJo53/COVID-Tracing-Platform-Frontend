import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/authentication/token.service';
import { UserRoleService } from 'src/app/core/services/user-role.service';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
const THUMBUP_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="22.077px" height="22.076px" viewBox="0 0 22.077 22.076" style="enable-background:new 0 0 22.077 22.076;" xml:space="preserve">
<g>
	<path style="fill:#757F8E;" d="M19.538,12.092c-0.035-0.024-0.071-0.102-0.06-0.137c0.508-1.301-0.572-1.161-1.167-1.116   c-1.709,0.128-1.883-0.733-1.833-2.159c0.033-0.948,0.111-2.32-1.363-2.466c-0.693-0.066-1.206-0.243-1.785-0.612   c-0.752-0.475-1.62-0.84-2.489-1.039C9.174,4.177,8.287,3.232,8.276,1.572C8.266-0.071,8.043-0.252,6.462,0.24   C6.038,0.372,5.667,0.674,5.262,0.877C4.09,1.467,3.069,2.511,1.53,2.014C1.637,3.143,2.967,3.885,2.624,4.72   c-1.033,2.501-0.03,5.299-1.296,7.728C1.265,12.568,1.421,12.833,1.523,13c1.454,2.439,1.278,5.385,2.455,7.912   c0.176,0.375-0.143,0.983,0.508,1.136c0.583,0.136,0.898-0.242,1.272-0.629c1.158-1.195,3.126-1.023,4.223,0.429   c0.308-0.828,0.669-1.596,1.541-1.299c1.569,0.538,1.604-0.57,1.662-1.483c0.065-1.046,0.481-2.007,1.229-2.488   c1.749-1.125,4.219-0.716,5.685,0.684c0.059-0.073,0.154-0.139,0.167-0.218c0.016-0.091-0.092-0.203-0.068-0.285   C20.635,15.11,21.487,13.405,19.538,12.092z"/>
</g>
`;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userRole: string[];
  role$: Observable<string[]>;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private tokenService: TokenService,
    private roleUserService: UserRoleService
  ) {
    this.role$ = this.roleUserService.role$;
    iconRegistry.addSvgIconLiteral(
      'bolivia',
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );
  }

  ngOnInit(): void {
    this.userRole = this.tokenService.getAuthorities();
    console.log(this.userRole[0]);
  }
}
