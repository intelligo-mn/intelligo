import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ChainDelayService {
  constructor() {}

  private queue: any[] = [];
  private timer: NodeJS.Timer;

  private schedule(fn: (queueLength: number) => any, t: number) {
    this.timer = setTimeout(() => {
      this.timer = null;
      fn(this.queue.length);
      if (this.queue.length) {
        let item = this.queue.shift();
        this.schedule(item.fn, item.t);
      }
    }, t);
  }
  delay(fn: (queueLength: number) => any, t: number) {
    // if already queuing things or running a timer,
    //   then just add to the queue
    if (this.queue.length || this.timer) {
      this.queue.push({ fn: fn, t: t });
    } else {
      // no queue or timer yet, so schedule the timer
      this.schedule(fn, t);
    }
  }
  cancel() {
    clearTimeout(this.timer);
    this.queue = [];
  }
}
