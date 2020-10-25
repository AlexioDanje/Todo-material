import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EventEmitter } from "events";
import { TodoService } from '../../services/todo.service';
import { Todo, TodoImpl } from '../../model/todo.model';

@Component({
             selector: 'app-update-todo',
             templateUrl: './update-todo.component.html',
             styleUrls: ['./update-todo.component.less']
           })

export class UpdateTodoComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<UpdateTodoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private todoService: TodoService) {
  }

  public todo: Todo;

  ngOnInit() {
    console.log(this.data.id);
    console.log(this.data.title);

    this.todo = new TodoImpl();
    this.todo.id = this.data.id;
    this.todo.title = this.data.title;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  update() {
    console.log(this.todo.id);
    this.todoService.update(this.todo.id, this.todo.title)
        .subscribe(() => {
                     console.info("The todo was updated successfully!")
                     this.data.title = this.todo.title;
                   },
                   error => console.error('Error occurred while updating the todo', error)
        );
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
