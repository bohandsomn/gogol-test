import { Component, OnInit } from '@angular/core'
import { StopWatchService } from '../stop-watch/stop-watch.service-with-rxjs'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

    constructor(private stopWatchService: StopWatchService) { }

    ngOnInit() { }

    ngDoCheck() {
        this.minutes = this.stopWatchService.minutes
        this.seconds = this.stopWatchService.seconds
    }

    minutes = this.stopWatchService.minutes
    seconds = this.stopWatchService.seconds

}
