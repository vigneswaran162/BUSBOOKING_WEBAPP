import { Component, OnInit } from '@angular/core';
import { BusBookingService } from '../../services/bus-booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-search',
  imports: [NgFor,NgIf],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})
export class BookSearchComponent implements OnInit {
param:any
BookSearchDet: any;
PassengerDet:any[]=[]
Isloading:boolean = false;
  constructor(private service:BusBookingService,private router:Router,
    private route:ActivatedRoute
  ){}

  async ngOnInit() {
 const paramMap = this.route.snapshot.paramMap;
  const fromPlace = paramMap.get('FromPlace');
  const toPlace = paramMap.get('Toplace');
  const departureDate = paramMap.get('BookingDate');

  if (fromPlace && toPlace && departureDate) {
    await this.BusBookSearch(fromPlace,toPlace,departureDate)
  }else{
    alert('Something went to wrong')
  }
  } 


async BusBookSearch(fromPlace: string,toPlace: string,departureDate: string){
  this.Isloading = true;
   let response:any = await this.service.GetBookSearch(fromPlace,toPlace,departureDate).catch(err =>{
    alert(err.message)
   })
   if(response != undefined){
     if(response.Boolval){
      this.BookSearchDet = response.data;
       this.Isloading = false;
     }else{
      alert(response.returnerror)
      this.Isloading = false;
     }
   }
}


BusDetails(item:any){
  this.router.navigate(['BusDetails',item.ScheduleID])
}

}



