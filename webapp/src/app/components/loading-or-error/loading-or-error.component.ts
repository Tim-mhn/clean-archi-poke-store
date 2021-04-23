import { Component, Input, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/interfaces/request-status.interface';

@Component({
  selector: 'app-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss']
})
export class LoadingOrErrorComponent implements OnInit {
  @Input("requestStatus") requestStatus: RequestStatus;
  @Input("errorMessage") errorMessage = "Error";

  requestStatusEnum = RequestStatus;
  constructor() { }

  ngOnInit(): void {
  }

}
