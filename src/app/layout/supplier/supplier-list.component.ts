import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { SupplierService } from '../../core/services/supplier.service';
import { Supplier } from '../../core/models/supplier';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  public suppliergrid: Observable<GridDataResult>;
  public selectedDeptItem: number;
  public itemToRemove: any;
  public supplierDataItem: Supplier;
  public isNew: boolean;

  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: {logic: 'and', filters: []}
  }

  constructor(private supplierService: SupplierService, private router: Router) { }

  getSuppliers(): void{
    // this.supplierService.getSupplierGrid(this.gridState)
      // .subscribe(ressuppliers => this.suppliergrid = ressuppliers);
    this.suppliergrid = this.supplierService;
    this.supplierService.getSupplierGrid(this.gridState);
  }

  ngOnInit(): void {
    const currentState = localStorage.getItem('MySupplierState');
    if(currentState != null){
      this.gridState = JSON.parse(currentState);
    }else{
      localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
    }
    this.getSuppliers();
  }

  public addHandler({sender}){
    this.isNew = true;
    this.supplierDataItem = new Supplier();
  }

  public editHandler({sender, rowIndex, dataItem}) {
    this.isNew = false;
    this.supplierDataItem = dataItem;
  }

  public cancelHandler(){
    this.supplierDataItem = undefined;
  }

  public saveHandler(supplier: Supplier) {
    if(this.isNew) {
      this.supplierService.addSupplier(supplier)
        .subscribe(ressupplier => {
          this.getSuppliers();
        });
    } else {
      this.supplierService.updateSupplier(supplier)
        .subscribe(ressupplier => {
          this.getSuppliers();
        });
    }
    this.supplierDataItem = undefined;
  }

  public removeHandler({dataItem}){
    this.itemToRemove = dataItem;
    // console.log("data" + dataItem);
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

  detail(supplier: Supplier): void {
    this.router.navigate([`/suppliers/${supplier.Id}`]);
  }

  onStateChange(dstate: DataStateChangeEvent): void {
    this.gridState = dstate;
    localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
    this.getSuppliers();
  }

}
