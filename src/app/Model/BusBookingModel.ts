export class BooKsearch{
    FromPlace:string;
    Toplace:string;
    DepartureDate:any;
}


export class ISchedule {
  ScheduleID: number;
  VendorID: number;
  BusName: string;
  BusVehicleNo: string;
  FromLocation:string;
  ToLocation: string;
  DepartureTime: string;
  ArrivalTime: string;
  ScheduleDate: Date;
  Price: number;
  TotalSeats: number;
  AvailableSeats:number;
}

export class BusBookingPassenger {
  passengerEmailId: string;
  bookingId: string;
  passengerName: string;
  age: number;
  gender: string;
  seatNo: string;
  Price:string;

}

export class Booking {
  bookingId: string;
  custId: string;
  bookingDate: Date;
  scheduleId: string;
  PickupPoint: string;
  DropPoint: string;
  EmailAddress:string;
  PhoneNo:string;
  TotalAmount:string;
  PaymentMode:string;
  busBookingPassengers: BusBookingPassenger[];
}
