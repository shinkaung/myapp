import { Component, OnInit } from '@angular/core';
import { Customer } from '../../core/models/customer';
import { Location } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerTypeService } from '../../core/services/customertype.service';
import { CustomerType } from '../../core/models/customerType';
import { environment } from '../../../environments/environment';
import { Globalfunction } from '../../core/global/globalfunction';
import { FileInfo } from '@progress/kendo-angular-upload';

export class MyFileInfo implements FileInfo {
  name: string;
  uid?: string;
  myUid?: string;
}

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  uploadSaveUrl: String = '';
  tempimage: String = '';
  uploadRemoveUrl: string = '';
  tempdir: string = '';
  
  customertypes: CustomerType[];
  customerAdd: FormGroup;
  public globalfunction: Globalfunction = new Globalfunction();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private customerTypeService: CustomerTypeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.uploadSaveUrl = `${environment.file_api_url}`+'/Upload/Temp';

    this.customerTypeService.getCustomerTypes().subscribe(resdepts => 
      this.customertypes = resdepts);
    this.customerAdd = new FormGroup({
      CustomerName: new FormControl(''),
      RegisterDate: new FormControl(),
      CustomerAddress: new FormControl(''),
      CustomerTypeId: new FormControl(),
      CustomerPhoto: new FormControl('')
    });
  }

  submitCustomer(): void {
    if(this.customerAdd.value.CustomerPhoto != null)
      this.customerAdd.patchValue({CustomerPhoto: this.tempimage + 
        this.customerAdd.value.CustomerPhoto[0].extension});

    var regDate = new Date(this.customerAdd.value.RegisterDate.getTime() - 
    (this.customerAdd.value.RegisterDate.getTimezoneOffset() * 6000));
    this.customerAdd.patchValue({RegisterDate: regDate});
    this.customerService.addCustomer(this.customerAdd.value)
    .subscribe(rescustomer => {
      this.router.navigate(['/customers']);
    });
  }

  public successEventHandler(e) {
    console.log(e);
    this.tempimage = e.response.body;
  }

  goBack(): void {
    this.location.back();
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
 
}