import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StopWatchService {
    public intervalId: ReturnType<typeof setInterval> | null = null

    private _minutes = 0
    private _seconds = 0

    private readonly _STEP = 1000
    private readonly _STEP_DOUBLE_CLICK = 500

    get minutes() {
        return this.align(this._minutes)
    }

    get seconds() {
        return this.align(this._seconds)
    }

    public start = () => {
        const updateTime = () => {
            this.setMinutes()
            this.setSeconds()
        }

        this.intervalId = setInterval(updateTime, this._STEP)
    }

    public stop = () => {
        this.clear()
        this.setInitial()
    }

    public wait = () => {
        const state = {
            current: null as ReturnType<typeof setInterval> | null
        }

        return () => {
            const setInitial = () => {
                state.current = null
            }

            if (state.current === null) {
                state.current = setTimeout(setInitial, this._STEP_DOUBLE_CLICK)
                return
            }

            clearInterval(state.current)
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
        const intervalId = this.intervalId

        if (intervalId === null) {
            return
        }

        clearInterval(intervalId)
        this.intervalId = null
    }
}
