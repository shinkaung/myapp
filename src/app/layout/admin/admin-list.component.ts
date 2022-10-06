import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Admin } from '../../core/models/admin';
import { AdminService } from '../../core/services/admin.service';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  public admingrid: GridDataResult;
  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: {logic: 'and', filters: []}
  };

  constructor(private adminService: AdminService,
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit() {
    const currentState = localStorage.getItem('MyAdminState');
    if (currentState != null) {
      this.gridState = JSON.parse(currentState);  
    }else {
      localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
    }
    this.getAdmins();
  }

  getAdmins(): void {
    console.log(this.translateService.currentLang);
    this.adminService.getAdminGrid(this.gridState)
        .subscribe(resadmins => this.admingrid = resadmins);
  }
          
delete(Admin: Admin): void {
  this.adminService.deleteAdmin(Admin.Id)
  .subscribe(deletestatus => {
    this.getAdmins();
    console.log(deletestatus);
  });
}

detail(Admin: Admin): void {
  this.router.navigate(['/admins/' + Admin.Id]);
}

onStateChange(dstate: DataStateChangeEvent): void {
  this.gridState = dstate;
  localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
  this.getAdmins();
}
}