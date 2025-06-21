import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BusBookingService } from '../../services/bus-booking.service';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { BooKsearch } from '../../Model/BusBookingModel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../../services/toast-notification.service';




@Component({
  selector: 'app-main-page',
  imports: [FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {


  LocationDetails: any;
  currentDate: any;
  model: BooKsearch;

  constructor(private service: BusBookingService, private router:Router,private Toast:ToastNotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.model = new BooKsearch()
      const today = new Date();
      this.currentDate = formatDate(today, 'yyyy-MM-dd', 'en-US');
      this.model.DepartureDate = this.currentDate;
      // this.currentDate = this.datePipe.transform(today, 'yyyy-MM-dd') || '';
      await this.GetLocationDetails();
    }
  }

  async GetLocationDetails() {
    let resp: any = await this.service.GetLocationDetails().catch(err => {
      alert(err.message);
    });
    if (resp != undefined) {
      if (resp.Boolval == true) {
        this.LocationDetails = resp.data;
        this.model.FromPlace = resp.data[0].LocationCode;
        this.model.Toplace = resp.data[1].LocationCode;
      } else {
        alert(resp.retrunerror);
      }
    }
  } 

  formvalidation(){
       if (this.model.FromPlace == " " || this.model.FromPlace == undefined || this.model.FromPlace == null) {
      this.Toast.showWarning('From Place Cannot be Blank', 'Orange Bus')
      return false
    }
    if (this.model.Toplace == " " || this.model.Toplace == undefined || this.model.Toplace == null) {
      this.Toast.showWarning('To place  Cannot be Blank', 'Orange Bus')
      return false
    }
    if (this.model.DepartureDate == " " || this.model.DepartureDate == undefined || this.model.DepartureDate == null) {
      this.Toast.showWarning('Departure Date  Cannot be Blank', 'Orange Bus')
      return false
    }
     if (this.model.FromPlace ==  this.model.Toplace) {
      this.Toast.showWarning('From Place and Toplace cannot be Same', 'Orange Bus')
      return false
    }
    return true
  }



  SearchBus(){
   if(this.formvalidation()){
    this.router.navigate([
  'BusSearch',
  this.model.FromPlace,
  this.model.Toplace,
  this.model.DepartureDate
]);
   }
  }
}
