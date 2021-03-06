import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/store.interface';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss']
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store;
  constructor() { }

  ngOnInit(): void {
  }

}
