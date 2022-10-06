import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminService } from '../../core/services/admin.service';
import { Location } from '@angular/common';
import { AdminLevel } from '../../core/models/AdminLevel';
import { IntlService } from '@progress/kendo-angular-intl';
import { environment } from  '../../../environments/environment';
import { AdminLevelService } from '../../core/services/adminlevel.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {
  
  adminlevels: AdminLevel[];
  selectedAdminlevel: number;
  adminEdit: FormGroup;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private adminlevelService: AdminLevelService,
    private location: Location,
    //private fb: FormBuilder,
    private intl: IntlService
  ) { }

  ngOnInit(): void {
    this.adminlevelService.getAdminLevels().subscribe(resdepts => this.adminlevels = resdepts);
    this.getAdmin();

    this.adminEdit = new FormGroup({
      Id: new FormControl(),
      AdminLevelId: new FormControl(),
      AdminName: new FormControl(''),
      Email: new FormControl(),
      LoginName: new FormControl(''),
      AdminPhoto: new FormControl('')
    });
  }

  getAdmin(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getAdmin(id).subscribe((resadmin) => {
        if(resadmin !== undefined){
        this.adminEdit.patchValue(resadmin);
        this.selectedAdminlevel = resadmin.AdminLevelId;
        }
    });
  }

  goBack(): void{
    this.location.back();
  }
  saveAdmin(): void{
    console.log('saved...');

    this.adminService.updateAdmin(this.adminEdit.getRawValue())
      .subscribe(resadmin => {
        this.router.navigate(['/admins']);
      }) 
  }
}
