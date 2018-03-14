import { Component, Input } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoListService} from '../services/todo-list.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {

  public todoList: Todo[] = [];

  constructor(private _todoListService: TodoListService) {}

  addNewElement(element: string) {
    const todo = {name: element, completed: false};
    this._todoListService.store(todo)
        .subscribe(res => this.todoList.push(res.data), alert);
  }

  markDone(todo: Todo) {
    todo.completed = true;
    this.mark(todo);
  }

  markUndone(todo: Todo) {
    todo.completed = false;
    this.mark(todo);
  }

  deleteTodo(data: any) {
    this._todoListService.delete(data.todo).subscribe(
      res => {
        debugger;
        var list  = this.todoList.slice();
        list.splice(data.index, 1);
        this.todoList = list;
      }
      , alert);
  }

  private mark(todo: Todo) {
    this._todoListService.update(todo)
        .subscribe(console.log, alert);
  }

}
