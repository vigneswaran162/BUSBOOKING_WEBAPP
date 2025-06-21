import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

    constructor(private toastr: ToastrService) {}

  showSuccess(title:any,message:any) {
    this.toastr.success(title, message);
  }
  showError(title:any,message:any) {
    this.toastr.error(title, message);
  }
  showWarning(title:any,message:any) {
    this.toastr.warning(title, message);
  }
  showInfo(title:any,message:any) {
    this.toastr.info(title, message);
  }
}
