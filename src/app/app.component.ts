import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.less']
           })
export class AppComponent {
  title = 'todo';

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateTodoComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.title = result;
    });

  }
}

