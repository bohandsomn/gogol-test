import { Injectable } from '@angular/core'
import { interval, Subscription, timer } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StopWatchService {
    public subscription: Subscription | null = null

    private _minutes = 0
    private _seconds = 0

    private readonly _PERIOD = 1000
    private readonly _DUE_TIME = 500

    public get minutes() {
        return this.align(this._minutes)
    }

    public get seconds() {
        return this.align(this._seconds)
    }

    public start = () => {
        const updateTime = () => {
            this.setMinutes()
            this.setSeconds()
        }

        this.subscription = interval(this._PERIOD).subscribe(updateTime) 
    }

    public stop = () => {
        this.clear()
        this.setInitial()
    }

    public wait = () => {
        const state = {
            current: null as Subscription | null
        }

        return () => {
            const setInitial = () => {
                state.current = null
            }

            if (state.current === null) {
                state.current = timer(this._DUE_TIME).subscribe(setInitial)
                return
            }

            state.current.unsubscribe() 
            setInitial()
            this.clear()
        }
    }

    public reset = () => {
        this.setInitial()
        this.clear()
        this.start()
    }

    private align = (time: number): string => {
        if (time < 10) {
            return '0' + time
        }

        return time.toString()
    }

    private setSeconds = () => {
        if (this._seconds !== 60 - 1) {
            this._seconds = this._seconds + 1
        } else {
            this._seconds = 0
        }
    }

    private setMinutes = () => {
        if (this._seconds !== 60 - 1) {
            return
        }

        if (this._minutes === 60 - 1) {
            this._minutes = 0
            return 
        }

        this._minutes = this._minutes + 1
    }

    private setInitial = () => {
        this._minutes = 0
        this._seconds = 0
    }

    private clear = () => {
        const intervalId = this.subscription

        if (intervalId === null) {
            return
        }

        intervalId.unsubscribe() 
        this.subscription = null
    }
}
