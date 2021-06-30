import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../common/item.model';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
})
export class TodoEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TodoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Item
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return;

    const updatedItem = {
      ...this.item,
      ...form.value,
    };

    this.dialogRef.close(updatedItem);
  }
}
