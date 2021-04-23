import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';
import { Store } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stores$: Observable<Store[]>;

  constructor(private _storeService: StoreService) {
  }

  ngOnInit(): void {
    // Use share replay instead of share since there will be late subscribes and need to replay latest value
     this.stores$ = this._storeService.getAllStores().pipe(shareReplay());
  }



}
