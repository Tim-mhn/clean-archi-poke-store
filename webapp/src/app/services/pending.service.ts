import { Injectable } from '@angular/core';
import { defer, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pending, Status } from '../interfaces/pending.interface';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor() { }

  public observableToPending<T>(obs: Observable<T>): Pending<T> {
    const status = new ReplaySubject<Status>();
    const request = obs.pipe(tap(() => status.next(Status.SUCCESS)))
    const data = defer(() => {
      status.next(Status.LOADING);
      return request;
    });
    return { data, status }
  }
}
