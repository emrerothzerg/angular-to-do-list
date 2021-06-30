import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  items: Item[] = [];

  constructor() {}

  getAllItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  updateItem(index: number, updatedItem: Item) {
    this.items[index] = updatedItem;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}
