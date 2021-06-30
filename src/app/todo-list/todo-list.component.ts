import { Component, OnInit } from '@angular/core';
import { Item } from '../common/item.model';
import { DataService } from '../common/data.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items!: Item[];
  showValidationErrors!: boolean;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.items = this.dataService.getAllItems();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return (this.showValidationErrors = true);
    this.dataService.addItem(new Item(form.value.text));
    this.showValidationErrors = false;
    form.reset();
    return;
  }

  toggleCompleted(item: Item) {
    item.completed = !item.completed;
  }

  editItem(item: Item) {
    const index = this.items.indexOf(item);

    let dialogRef = this.dialog.open(TodoEditComponent, {
      width: '680px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateItem(index, result);
      }
    });
  }

  deleteItem(item: Item) {
    const index = this.items.indexOf(item);
    this.dataService.deleteItem(index);
  }
}
