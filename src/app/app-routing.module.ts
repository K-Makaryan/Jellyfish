import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
      .then(c => c.HomeComponent),
  },
  {
    path: 'youtube-mp3',
    loadComponent: () => import('./pages/youtube-mp3/youtube-mp3.component')
      .then(c => c.YoutubeMp3Component),
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
