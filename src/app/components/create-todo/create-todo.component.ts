import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoImpl } from "../../model/todo.model";
import { Router } from "@angular/router";

@Component({
             selector: 'app-create-todo',
             templateUrl: './create-todo.component.html',
             styleUrls: ['./create-todo.component.less']
           })
export class CreateTodoComponent {

  public todo: Todo = new TodoImpl();
  public submitted: boolean = false;
  todos;

  constructor(private todoService: TodoService, private router: Router) {
  }

  saveTodo(): void {
    this.todoService.create(this.todo.title)
        .subscribe(() => this.submitted = true,
                   error => console.error('Error occurred while creating the todo', error));
    window.location.reload();

  }

  retrieveTodos(): void {
    this.todoService.getAll()
        .subscribe(
          data => this.todos = data,
          error => console.error(error));
  }

}

