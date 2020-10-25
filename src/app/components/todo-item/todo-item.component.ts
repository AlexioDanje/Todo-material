import { Component, Input, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UpdateTodoComponent } from '../update-todo/update-todo.component';

@Component({
             selector: 'app-todo-item',
             templateUrl: './todo-item.component.html',
             styleUrls: ['./todo-item.component.less']
           })
export class TodoItemComponent implements OnInit {

  @Input() todo;
  message = '';
  faPencil = faPencilAlt;
  faTrash = faTrashAlt;

  //npm install @fortawesome/free-solid-svg-icons
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  updateTodo() {
    return this.todoService.update(this.todo.id, this.todo.title)
               .subscribe(() => this.message = 'The todo was updated successfully!',
                          error => console.error('Error occurred while updating the todo', error));
  }

  deleteTodo() {
    return this.todoService.delete(this.todo.id)
               .subscribe(() =>
                            // this.router.navigate(['/todos']),
                            window.location.reload(),
                          error => {
                            console.error('Error occurred while deleting the todo', error);
                          });

  }

  openModal(todo) {
    this.todo = todo;
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "300px";
    dialogConfig.data = todo;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UpdateTodoComponent, dialogConfig);
  }

}



