import { Component, OnInit, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { VideosService } from './videos.service';

@Component({
  selector: 'app-videos',
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px', backgroundColor: 'red'
          }))
      ])
    ])
  ],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videoSrc: string;
  videos: Array<string>;
  player;
  activeVideo: number;
  isOpen: boolean;

  constructor(private videosService: VideosService, private elRef: ElementRef) {
    this.videos = this.videosService.videos;
    this.videoSrc = this.videos[0];
    this.activeVideo = 0;
  }

  ngOnInit() {
    this.player = this.elRef.nativeElement.querySelector('video');
  }

  playVideo(i: number) {
    this.videoSrc = this.videos[i];
    this.player.load();
    this.player.play();
    this.activeVideo = i;
  }

  deleteVideo(ev: Event, i: number) {
    ev.stopPropagation();

    if (this.activeVideo === this.videos.length - 1) {
      this.playVideo(0);
    } else if (this.activeVideo === i) {
      this.playVideo(i + 1);
      this.activeVideo = i;
    }

    this.videosService.deleteVideo(i);
    this.toggle();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
