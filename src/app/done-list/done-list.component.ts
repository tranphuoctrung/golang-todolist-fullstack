import { Component, OnInit, OnDestroy } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoListService} from '../services/todo-list.service';
import {Observable} from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.css']
})
export class DoneListComponent implements /*OnActivate, CanDeactivate, */OnInit, OnDestroy {
  title = 'Done List';

  doneList: Todo[] = [];

  constructor(private _todoListService: TodoListService) {}

  ngOnInit() {
    console.log('Init ' + this.title);
    this._todoListService.getAll()
      .mergeMap((todos: Todo[]) => Observable.from(todos))
      .filter((todo: Todo) => todo.completed)
      .subscribe(
        (todo: Todo) => this.doneList.push(todo),
        (error: string) => alert(error));
  }

  ngOnDestroy() {
    console.log('Destroy ' + this.title);
  }

  deleleTodo(todo: Todo, index: number) {
    debugger
    this._todoListService.delete(todo).subscribe(
      res => {
        this.doneList.splice(index, 1);
      }
      , alert);
  }

  // routerOnActivate(curr: RouteSegment):void {
  //   console.log('Entering view ' + this.title);
  //   this._todoListService.getAll()
  //     .flatMap((todos:Todo[]) => Observable.from(todos))
  //     .filter((todo: Todo) => todo.done)
  //     .subscribe(
  //       (todo: Todo) => this.todos.push(todo),
  //       (error: string) => alert(error));
  // }
  //
  // routerCanDeactivate(currTree?:RouteTree, futureTree?:RouteTree):Promise<boolean> {
  //   console.log('Leaving view ' + this.title);
  //   return Promise.resolve(true);
  // }
}
