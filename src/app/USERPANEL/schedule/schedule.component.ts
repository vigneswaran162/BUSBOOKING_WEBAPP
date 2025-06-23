import { Component, OnInit } from '@angular/core';
import { BusBookingService } from '../../services/bus-booking.service';
import { formatDate } from '@angular/common';
import { ISchedule } from '../../Model/BusBookingModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {

  LocationDetails: any
  VendorDetails: any;
  currentDate: string;
  model: ISchedule;
  constructor(private service: BusBookingService) { }

  async ngOnInit() {
    this.model = new ISchedule();
    const today = new Date();
    this.currentDate = formatDate(today, 'yyyy-MM-dd', 'en-US');
    await this.GetLocationDetails();
    await this.GetVendorDetails();
  }


  async GetLocationDetails() {
    let resp: any = await this.service.GetLocationDetails().catch(err => {
      alert(err.message);
    });
    if (resp != undefined) {
      if (resp.Boolval == true) {
        this.LocationDetails = resp.data;
      } else {
        alert(resp.retrunerror);
      }
    }
  }


  async GetVendorDetails() {
    let resp: any = await this.service.GetVendorDetails().catch(err => {
      alert(err.message);
    });
    if (resp != undefined) {
      if (resp.Boolval == true) {
        this.VendorDetails = resp.data;
      } else {
        alert(resp.retrunerror);
      }
    }
  }


  preparemodel() {
    const mod = new ISchedule();
    mod.ScheduleID = this.model.ScheduleID;
    mod.VendorID = this.model.VendorID;
    mod.BusVehicleNo = this.model.BusVehicleNo;
    mod.BusName = this.model.BusName;
    mod.AvailableSeats = this.model.AvailableSeats;
    mod.TotalSeats = this.model.TotalSeats;
    mod.FromLocation = this.model.FromLocation;
    mod.ToLocation = this.model.ToLocation;
    mod.ScheduleDate = this.model.ScheduleDate;
    mod.ArrivalTime = this.model.ArrivalTime;
    mod.DepartureTime = this.model.DepartureTime;
    mod.Price = this.model.Price;
    return mod
  }

  async OnSubmit() {
    const editmod = this.preparemodel()
    let resp: any = await this.service.CreateSchedule(editmod).catch(err => {
      alert(err.message)
    })
    if (resp != undefined) {
      if (resp.Boolval) {
        // this.model = new ISchedule();
        alert('Sucessfully Created')
      } else {
        alert(resp.returnerror)
      }
    }
  }
}
