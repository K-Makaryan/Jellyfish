import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { IYoutubeMp3Data } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-youtube-mp3',
  templateUrl: './youtube-mp3.component.html',
  styleUrls: ['./youtube-mp3.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class YoutubeMp3Component {
  private pattern: RegExp = /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  public ytId: FormControl<string | null> = new FormControl('', [
    Validators.required,
    Validators.pattern(this.pattern),
  ]);
  public ytData: IYoutubeMp3Data;
  public pending: boolean;

  constructor(private http: HttpClient) {}

  private matchRegex(id: string): string | null {
    const match = id.match(this.pattern);
    return match?.[1] || null;
  }

  public requestMp3(): void {
    this.pending = true;
    this.http
      .get<IYoutubeMp3Data>(
        `https://youtube-mp36.p.rapidapi.com/dl?id=${this.matchRegex(
          this.ytId.value || ''
        )}`,
        {
          headers: {
            'X-RapidAPI-Key': 'c91988d166mshfc1a617401e8b10p1e5ed6jsn6f82ddf95f6e',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
          },
        }
      )
      .subscribe((data: IYoutubeMp3Data) => {
        this.ytData = data;
        this.pending = false;
        this.ytId.reset();
        window.open(this.ytData.link, '_self');
      });
  }
}
