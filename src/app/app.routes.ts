import { Routes } from '@angular/router';
import { MainPageComponent } from './USERPANEL/main-page/main-page.component';
import { ScheduleComponent } from './USERPANEL/schedule/schedule.component';
import { BookSearchComponent } from './USERPANEL/book-search/book-search.component';
import { BusDetailsComponent } from './USERPANEL/bus-details/bus-details.component';

export const routes: Routes = [
    {
        path:"",
        component:MainPageComponent
    },
       {
        path:"Schedule",
        component:ScheduleComponent
    },
    {
        path:'BusSearch/:FromPlace/:Toplace/:BookingDate',
        component:BookSearchComponent
    },
    {
        path:'BusDetails/:id',
        component:BusDetailsComponent
    }
];
