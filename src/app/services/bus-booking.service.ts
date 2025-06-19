import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusBookingService {
 
  private apiurl:string = 'http://localhost:8000/'

  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://backendvercel-brown.vercel.app/';

  async GetLocationDetails() {
    const url = this.baseUrl + 'GetLocationDetails';
    return await firstValueFrom(this.http.get(url));
  }
  async GetVendorDetails() {
    const url = this.baseUrl + 'GetVendorDetails';
    return await firstValueFrom(this.http.get(url));
  }

   async GetBookSearch(FromLocation: string,ToLocation: string,ScheduleDate: string) {
    const url = this.baseUrl + 'GetBusSearch?FromLocation='+FromLocation+'&ToLocation='+ToLocation+'&ScheduleDate='+ScheduleDate;
    return await firstValueFrom(this.http.get(url));
  }

  async GetScheduleID(ScheduleID: string) {
    const url = this.baseUrl + 'GetScheduleDetail?ScheduleID='+ScheduleID;
    return await firstValueFrom(this.http.get(url));
  }

   async GetBookedSeats(ScheduleID: string) {
    const url = this.baseUrl + 'GetBookedSeats?ScheduleID='+ScheduleID;
    return await firstValueFrom(this.http.get(url));
  }


  
  async CreateSchedule(Entity: any) {
  const url = this.baseUrl + 'Schedule';
  const headers = { 'Content-Type': 'application/json' };
  return await firstValueFrom(this.http.post(url, {Entity}, { headers }));
}
  async CreateBooking(Entity: any) {
  const url = this.baseUrl + 'BusBooking';
  const headers = { 'Content-Type': 'application/json' };
  return await firstValueFrom(this.http.post(url, {Entity}, { headers }));
}
}
