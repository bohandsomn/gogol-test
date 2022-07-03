import { Component, OnInit } from '@angular/core'
import { StopWatchService } from '../stop-watch/stop-watch.service-with-rxjs'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(private stopWatchService: StopWatchService) { }

    ngOnInit() { }

    ngDoCheck() {
        this.intervalId = this.stopWatchService.subscription
    }

    intervalId = this.stopWatchService.subscription

    start = () => this.stopWatchService.start()
    stop = () => this.stopWatchService.stop()
    wait = this.stopWatchService.wait()
    reset = () => this.stopWatchService.reset()
}
