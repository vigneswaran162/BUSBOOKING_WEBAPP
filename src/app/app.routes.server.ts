import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'BusSearch/:FromPlace/:Toplace/:BookingDate',
    renderMode: RenderMode.Server,
  },
  {
    path:'BusDetails/:id',
    renderMode: RenderMode.Server,

  }

];
