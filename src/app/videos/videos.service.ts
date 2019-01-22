import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
    
    private _videos;

    constructor () {
        this._videos = [
            'http://www.html5videoplayer.net/videos/toystory.mp4',
            'http://techslides.com/demos/sample-videos/small.mp4',
            'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
            'https://www.cinemaclock.com/html/videos/97/59197-206545-lego_batman_mov.mp4',
            'https://www.cinemaclock.com/html/videos/44/44144-207467-power_rangers__.mp4',
            'https://www.bpsd.org/VideoUp/b582933f-e47a-40aa-8a8c-f1f7f45f4159.mp4.mp4',
            'https://i.makeagif.com/media/9-07-2015/ICzTfM.mp4'
        ];
    }

    deleteVideo(i: number) {
        this._videos.splice(i, 1);
    }

    public get videos (): Array<string> {
        return this._videos;
    }
}