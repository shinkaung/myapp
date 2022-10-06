import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {  //it is use to transfer data between difference components

  private isSaved = new BehaviorSubject(false);
  currentValue = this.isSaved.asObservable();

  private editData = new BehaviorSubject({});
  currentEditData = this.editData.asObservable();

  private extraData = new BehaviorSubject({});
  public currentExtraData: any = this.extraData.asObservable();

  constructor() { }
  
  isSavedAdmin(isSaved: boolean) {
    this.isSaved.next(isSaved);
  }

  TransferEditData(editData: any) {
    this.editData.next(editData);
  }
  TransferExtraData(extraData: any) {
    this.extraData.next(extraData);
  }
}
