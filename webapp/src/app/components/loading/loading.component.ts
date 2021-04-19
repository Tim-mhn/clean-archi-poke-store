import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/interfaces/pending.interface';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input("asyncStatus") asyncStatus$: Observable<Status>
  readonly Status = Status;
  constructor() { }

  ngOnInit(): void {
  }

}
