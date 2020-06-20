import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ListItem {
  id: string;
  name: string;
  description?: string;
  data?: any;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  collection: ListItem[] = [];

  @Output('itemSelected')
  itemSelectedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  itemSelected(itemID: string): void {
    this.itemSelectedEvent.emit(itemID);
  }
}
