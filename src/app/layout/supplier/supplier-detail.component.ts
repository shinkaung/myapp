import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierTypeService } from '../../core/services/suppliertype.service';
import { Supplier } from '../../core/models/supplier';
import { SupplierType } from '../../core/models/supplierType';
import { EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Globalfunction } from '../../core/global/globalfunction';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  suppliertypes: SupplierType[];
  supplierformGroup: FormGroup;
  active = false;
  previewimage: string;
  photoToRemove: string = null;
  tempimage: string = '';
  uploadSaveUrl: string = '';
  uploadRemoveUrl: string = '';
  public globalfunction: Globalfunction = new Globalfunction();

  @Input() public isNew = false;

  @Input() public set model(supplierobj: Supplier){
    
    if (supplierobj !== undefined) {
      
      if (supplierobj.Id == undefined) {  // New, can't use isNew flag because of dealy of input
        this.supplierformGroup = new FormGroup({
          SupplierName: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]),
          RegisterDate: new FormControl(new Date()),
          SupplierAddress: new FormControl(''),
          SupplierTypeId: new FormControl(0),
          SupplierPhoto: new FormControl('')
        });
      }
      else { // Edit
        this.supplierService.getImagePath(supplierobj.Id)
        .subscribe(resimage => {
          this.previewimage =resimage;
        });
        this.supplierformGroup = new FormGroup({
          Id: new FormControl(supplierobj.Id),
          SupplierName: new FormControl(supplierobj.SupplierName, [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]),
          RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(supplierobj.RegisterDate, 'yyyy-MM-dd'))),
          SupplierAddress: new FormControl(supplierobj.SupplierAddress),
          SupplierTypeId: new FormControl(supplierobj.Id),
          SupplierPhoto: new FormControl(supplierobj.SupplierPhoto)
        })
      }
    }

    this.active = supplierobj !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Supplier> = new EventEmitter();

  constructor(
    private suppliertypeService: SupplierTypeService, 
    private intl: IntlService,
    private supplierService: SupplierService,
    ) { }

  ngOnInit(): void {
    this.uploadSaveUrl = `${environment.file_api_url}`+'/Upload/Temp';
    this.uploadRemoveUrl = `${environment.file_api_url}`+'/Upload/TempRemove';
    this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
  }

  public onSave(e): void{
    e.preventDefault();
    console.log('date :', this.supplierformGroup.value.RegisterDate);
    if(this.supplierformGroup.value.SupplierPhoto != null)
    this.supplierformGroup.patchValue({SupplierPhoto: this.tempimage});

    var regDate = new Date(this.supplierformGroup.value.RegisterDate.getTime() - 
    this.supplierformGroup.value.RegisterDate.getTimezoneOffset() * 60000);
    this.supplierformGroup.patchValue({RegisterDate: regDate});

    this.save.emit(this.supplierformGroup.getRawValue());
    this.active = false;
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  private closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }

  public uploadEventHandler(e) {
    var test = this.globalfunction.encryptData(e.files[0].name);//to add unique temp dir as parameter when upload
    e.data = {
      enFile : test
    };
  }

  public removeEventHandler(e) { //to clear temp file
    e.files[0].name = this.tempimage; //to add unique temp
  }

  public successEventHandler(e) {
    if(e.operation == 'upload')
    this.tempimage = e.response.body;
  }

  public deleteImageHandler(e) {
    this.photoToRemove = "SupplierPhoto";
    e.preventDefault();
  }

  public confirmPhotoRemove(shouldRemove: boolean): void {

    if(shouldRemove) {
      this.supplierService.deleteSupplierPhoto(this.supplierformGroup.value.Id)
      .subscribe(deletestatus => {
        this.previewimage="";
        this.photoToRemove = null;
      });
    }
    else{
      this.photoToRemove = null;
    }
  }
}
