import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { SupplierService } from '../../core/services/supplier.service';
import { Supplier } from '../../core/models/supplier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { send } from 'process';
import { IntlService } from '@progress/kendo-angular-intl';
import { Observable } from 'rxjs';
import { SupplierType } from '../../core/models/supplierType';
import { SupplierTypeService } from '../../core/services/suppliertype.service';

@Component({
  selector: 'app-supplier-inline',
  templateUrl: './supplier-inline.component.html',
  styleUrls: ['./supplier-inline.component.scss']
})
export class SupplierInlineComponent implements OnInit {

  public suppliergrid: Observable<GridDataResult>;
  public selectedDeptItem: number;
  public itemToRemove: any;
  public supplierDataItem: Supplier;
  public isNew: boolean;
  supplierformGroup: FormGroup;
  public editedRowIndex: number;

  public suppliertypes: SupplierType[];

  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: {logic: 'and', filters: []}
  }

  constructor(
    private supplierService: SupplierService, 
    private router: Router,  
    private intl: IntlService, 
    private suppliertypeService: SupplierTypeService) { }

  ngOnInit(): void {
    this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
    const currentState = localStorage.getItem('MySupplierState');
    if(currentState != null){
      this.gridState = JSON.parse(currentState);
    }else{
      localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
    }
    this.getSuppliers();
  }

  getSuppliers(): void{
    this.suppliergrid = this.supplierService;
    this.supplierService.getSupplierGrid(this.gridState);
  }

  public addHandler({sender}){

    this.closeEditor(sender);

    this.supplierformGroup = new FormGroup({
      SupplierName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      RegisterDate: new FormControl(new Date()),
      SupplierAddress: new FormControl(''),
      SupplierTypeId: new FormControl(0)
    });
    sender.addRow(this.supplierformGroup);
  }

  public editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);

    this.supplierformGroup = new FormGroup({
      Id: new FormControl(dataItem.Id),
      SupplierName: new FormControl(dataItem.SupplierName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(dataItem.RegisterDate, 'yyyy-MM-dd'))),
      SupplierAddress: new FormControl(dataItem.SupplierAddress),
      SupplierTypeId: new FormControl(dataItem.SupplierTypeId)
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.supplierformGroup);
  }

  public cancelHandler({sender, rowIndex}){
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {

    var regDate = new Date(this.supplierformGroup.value.RegisterDate.getTime() - 
    (this.supplierformGroup.value.RegisterDate.getTimezoneOffset()*60000));
    this.supplierformGroup.patchValue({RegisterDate: regDate});

    if(isNew) {
      this.supplierService.addSupplier(this.supplierformGroup.value)
        .subscribe(ressupplier => {
          this.getSuppliers();
        });
    } else {
      //console.log(this.supplierformGroup.value)
      this.supplierService.updateSupplier(this.supplierformGroup.value)
        .subscribe(ressupplier => {
          this.getSuppliers();
        });
    }
    
    sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}){
    this.itemToRemove = dataItem;
    // console.log("data" + dataItem);
  }

  public closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.supplierformGroup = undefined;
  }

  public confirmRemove(shouldRemove: boolean): void{
    
    // console.log("Item" + this.itemToRemove.Id);
    if(shouldRemove) {
      this.supplierService.deleteSupplier(this.itemToRemove.Id)
        .subscribe(deletestatus => {
          this.getSuppliers();
          console.log(deletestatus);
        });
    }

    this.itemToRemove = null;
  }

  onStateChange(dstate: DataStateChangeEvent): void {
    this.gridState = dstate;
    localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
    this.getSuppliers();
  }

}
