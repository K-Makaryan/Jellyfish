import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeMp3Component } from './pages/youtube-mp3/youtube-mp3.component';

const routes: Routes = [
  {
    path: 'youtube-mp3',
    loadComponent: () => import('./pages/youtube-mp3/youtube-mp3.component')
      .then(c => c.YoutubeMp3Component)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
