import { Component, OnInit } from '@angular/core';
import { Customer } from '../../core/models/customer';
import { Location } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLevelService } from '../../core/services/adminlevel.service';
import { AdminLevel } from '../../core/models/adminlevel';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  uploadSaveUrl: String = '';
  tempimage: String = '';
  uploadRemoveUrl: string = '';
  tempdir: string = '';
  
  adminlevels: AdminLevel[];
  adminAdd: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private adminLevelService: AdminLevelService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.uploadSaveUrl = `${environment.file_api_url}`+'/Upload/Temp';

    this.adminLevelService.getAdminLevels().subscribe(resdepts => 
      this.adminlevels = resdepts);
    this.adminAdd = new FormGroup({
      AdminLevelId: new FormControl(),
      AdminName: new FormControl(''),
      Email: new FormControl(),
      LoginName: new FormControl(''),
      Password: new FormControl(),
      AdminPhoto: new FormControl('')
    });
  }

  submitAdmin(): void {
    // if(this.adminAdd.value.AdminPhoto != null)
    //   this.adminAdd.patchValue({AdminPhoto: this.tempimage + 
    //     this.adminAdd.value.AdminPhoto[0].extension});

    // var regDate = new Date(this.customerAdd.value.RegisterDate.getTime() - 
    // (this.customerAdd.value.RegisterDate.getTimezoneOffset() * 6000));
    // this.customerAdd.patchValue({RegisterDate: regDate});
    this.adminService.addAdmin(this.adminAdd.value)
    .subscribe((resadmin) => {
      this.router.navigate(['/admins']);
    });
  }

  public successEventHandler(e) {
    console.log(e);
    this.tempimage = e.response.body;
  }

  goBack(): void {
    this.location.back();
  }

  public uploadEventHandler(e) { //to add unique temp dir as parameter when upload
    console.log(e);
    e.data = {tempdir: this.tempdir};
  }

    public removeEventHandler(e) { //to clear temp file
    e.data = {tempdir : this.tempdir}; //to add unique temp
  }
 
}