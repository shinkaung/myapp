import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerTypeService } from '../../core/services/customertype.service';
import { CustomerService } from '../../core/services/customer.service';
import { Location } from '@angular/common';
import { CustomerType } from '../../core/models/CustomerType';
import { IntlService } from '@progress/kendo-angular-intl';
import { environment } from  '../../../environments/environment';
import { Globalfunction } from '../../core/global/globalfunction';
import { FileInfo } from '@progress/kendo-angular-upload';

export class MyFileInfo implements FileInfo {
  name: string;
  uid?: string;
  myUid?: string;
}
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})

export class CustomerDetailComponent implements OnInit {

  previewimage: {};
  uploadSaveUrl: string = '';
  uploadRemoveUrl: string = '';
  tempdir: string = '-';
  photoToRemove = null;
  customertypes: CustomerType[];
  selectedCustomertype: number;
  public globalfunction: Globalfunction = new Globalfunction();

  customerEdit = this.fb.group({
    Id: [0],
    CustomerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    RegisterDate: [new Date],
    CustomerAddress: [''],
    CustomerTypeId: [0],
    CustomerPhoto: []
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private customertypeService: CustomerTypeService,
    private location: Location,
    private fb: FormBuilder,
    private intl: IntlService
  ) { }

  ngOnInit(): void {
    this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/TempDir';
    this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemoveDir';
    this.customertypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);
    this.getCustomer();
  }

  getCustomer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.previewimage = "";
    this.customerService.getCustomer(id).subscribe((rescustomer) => {
        if(rescustomer !== undefined){
        rescustomer.RegisterDate = new Date(new Date(rescustomer.RegisterDate).toDateString());
        this.customerEdit.patchValue(rescustomer);
        this.selectedCustomertype = rescustomer.CustomerTypeId;

        this.customerService.getImagePath(id)
          .subscribe(resimage => {
            this.previewimage = resimage;
          })
        }
    });
  }

  goBack(): void{
    this.location.back();
  }


  saveCustomer(): void{
    console.log('saved...');
    var regDate = new Date(this.customerEdit.value.RegisterDate.getTime() - (this.customerEdit.value.RegisterDate.getTimezoneOffset() * 60000));
    this.customerEdit.patchValue({RegisterDate: regDate});

    if(this.customerEdit.value.CustomerPhoto != null && this.customerEdit.value.CustomerPhoto!=""){
      this.customerEdit.patchValue({CustomerPhoto: this.tempdir});
    }

    this.customerService.updateCustomer(this.customerEdit.getRawValue())
      .subscribe(rescustomer => {
        this.router.navigate(['/customers']);
      })
    
  }

  public uploadEventHandler(e) { // to add unique temp dir as parameter when upload
    console.log(e);
    e.data = {
      tempdir : this.tempdir,
      enFile : this.globalfunction.encryptData(e.files[0].name)
    };
  }

  public removeEventHandler(e) { //to clear temp file
     const myFile: MyFileInfo = <MyFileInfo>e.files[0];
      e.data = {
        tempdir : this.tempdir,
        myUid : myFile.myUid
      }; //to add unique temp dir as parameter when remove
  }

  public successEventHandler(e, filename) {
    if(e.operation == 'upload') {
      this.tempdir = e.response.body.tempdir;
      let file = <MyFileInfo>e.files[0];
      file.myUid = e.response.body.myUid;
    }
  }

  public deleteImageHandler(e, filename) {
    this.photoToRemove = filename;
    e.preventDefault();
  }

  public confirmPhotoRemove(shouldRemove: boolean): void {
  
    if(shouldRemove) {
      this.customerService.deleteCustomerPhoto(this.customerEdit.value.Id, this.photoToRemove.value.myUid)
      .subscribe(deletestatus => {
        delete this.previewimage[this.photoToRemove.key];
        this.photoToRemove = null;
      });
    }
    else{
      this.photoToRemove = null;
    }
  }
}
