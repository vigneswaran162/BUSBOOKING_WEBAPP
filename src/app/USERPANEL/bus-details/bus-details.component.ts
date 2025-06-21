import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusBookingService } from '../../services/bus-booking.service';
import { Booking } from '../../Model/BusBookingModel';
import { FormsModule } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-bus-details',
  imports: [NgFor,NgClass,DatePipe,FormsModule],
  templateUrl: './bus-details.component.html',
  styleUrl: './bus-details.component.css'
})
export class BusDetailsComponent implements OnInit  {
BusDet: any;
PassengerDet: any[]=[];
model:Booking;
busBookingPassengers: any;
isModalOpen:boolean =false;
  totalAmount: any;
  Bookedseats: any;

constructor(private route:ActivatedRoute ,private service:BusBookingService){


}

async ngOnInit(){
   const paramMap = this.route.snapshot.paramMap.get('id');
   if(paramMap){
  this.model = new Booking();
   this.busBookingPassengers=[];
  await this.GetScheduleID(paramMap);
  await this.GetBookedSeats(paramMap)

 }
}


async GetScheduleID(paramMap: any){
   let response:any = await this.service.GetScheduleID(paramMap).catch(err =>{
    alert(err.message)
   })
   if(response != undefined){
     if(response.Boolval){
      this.BusDet = response.data;
      this.model.custId = 'vicky';
      this.model.scheduleId = this.BusDet.ScheduleID;
      this.model.bookingDate = this.BusDet.ScheduleDate;
      this.model.bookingId ='BK-001'
       for(let i=0; i< this.BusDet.AvailableSeats;i++){
        let obj ={
          seatNo:i+1 +'S',
          selected:false,
          Price:this.BusDet.Price,
          SeatBooked:false,
        }
        this.PassengerDet.push(obj);
      }    
     }else{
      alert(response.returnerror)
     }
   }
}

async GetBookedSeats(paramMap: any){
   let response:any = await this.service.GetBookedSeats(paramMap).catch(err =>{
    alert(err.message)
   })
   if(response != undefined){
     if(response.Boolval){
      this.Bookedseats = response.data[0].seatNumbers;
      this.PassengerDet.forEach(seat => {
  if (this.Bookedseats.includes(seat.seatNo)) {
    seat.SeatBooked = true;
  }
});
    
     
     }else{
      alert(response.returnerror)
     }
   }
}


AddRow(seat:any,i:number){

  const index = this.busBookingPassengers.findIndex((item: any) => item.seatNo === seat.seatNo);

  if (index !== -1) {

    this.busBookingPassengers.splice(index, 1);
  }else if(this.busBookingPassengers.length > 4){
   alert('Maximum allowed one person 4 seats')
   this.PassengerDet[i].selected = false;
  } else {

    const obj = {
      passengerEmailId: '',
      bookingId: '',
      passengerName: '',
      age: null,
      gender: '',
      seatNo: seat.seatNo,
      Price:seat.Price 
    };
    this.busBookingPassengers.push(obj);

    this.totalAmount = this.busBookingPassengers.reduce((sum:any, p:any) => sum + (p.Price || 0), 0);
    this.model.TotalAmount = this.totalAmount;
  }
}

toggleModal() {
  if (this.busBookingPassengers.length == 0) {
    alert('Please Select Seat');
    return false;
  }

  if (this.busBookingPassengers.length > 0) {
    for (let i = 0; i < this.busBookingPassengers.length; i++) {
      const passenger = this.busBookingPassengers[i];
      if (!passenger.passengerName) {
        alert('Please Select Name');
        return false;
      }
      if (!passenger.age) {
        alert('Please Enter Age');
        return false;
      }
      if (!passenger.gender) {
        alert('Please Select Gender');
        return false;
      }
    }
  }
  this.isModalOpen = !this.isModalOpen;
  return true;
}

 

preparemodel(){
  const mod = new Booking();
  mod.custId ='001',
  mod.bookingDate = this.model.bookingDate;
  mod.bookingId= this.model.bookingId;
  mod.PhoneNo = this.model.PhoneNo;
  mod.EmailAddress = this.model.EmailAddress;
  mod.TotalAmount = this.model.TotalAmount;
  mod.scheduleId = this.model.scheduleId;
  mod.busBookingPassengers=[];
   for(let i=0;i<this.busBookingPassengers.length;i++){
       const obj = {
      passengerEmailId:this.busBookingPassengers[i].passengerEmailId,
      bookingId:this.model.bookingId,
      passengerName: this.busBookingPassengers[i].passengerName,
      age:this.busBookingPassengers[i].age,
      gender: this.busBookingPassengers[i].gender,
      seatNo: this.busBookingPassengers[i].seatNo,
      Price:this.busBookingPassengers[i].Price 
    };
    mod.busBookingPassengers.push(obj);
   }
   return mod
}


formvalidation(){
  if(this.model.EmailAddress ==" " || this.model.EmailAddress == undefined || this.model.EmailAddress == null){
    alert("Email Address Cannot be Blank")
    return false
  }
   if(this.model.PhoneNo ==" " || this.model.PhoneNo == undefined || this.model.PhoneNo == null){
    alert("Phone No Address Cannot be Blank")
      return false
  }
    return true
}

async onSubmit(){
  if(this.formvalidation()){
    const editmod = this.preparemodel();
   let resp: any = await this.service.CreateBooking(editmod).catch(err => {
        alert(err.message)
      })
      if (resp != undefined) {
        if (resp.Boolval) {

          this.payNow()
          // alert('Sucessfully Created')
          // this.model = new Booking()
          // this.isModalOpen =false;
        } else {
          alert(resp.returnerror)
        }
      }
  }
}



  payNow() {
    const amount = 5; // ₹500

    this.service.createOrder(amount).subscribe((order: any) => {
      const options = {
        key: 'rzp_test_AApuZR0yWRvZ5T', 
        amount: order.amount,
        currency: order.currency,
        name: 'ORANGE BUS',
        description: 'Test Transaction',
        order_id: order.id,
        handler: function (response: any) {
          alert('Payment successful. Razorpay Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Vigneswaran',
          email: 'vigneswaran@example.com',
          contact: '9000090000',
        },
        theme: {
          color: '#3399cc',
        }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    });
  }
}





 

