import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoListService} from '../services/todo-list.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDone: EventEmitter<Todo> = new EventEmitter<Todo>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUndone: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() onDeleteTodo: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoListService.getAll().subscribe(
      (todos: Todo[]) => {
        todos.forEach(todo => this.todos.push(todo));
      },
      (error: string) => alert(error));
  }

  markDone(todo: Todo) {
    this.onDone.emit(todo);
  }

  markUndone(todo: Todo) {
    this.onUndone.emit(todo);
  }

  deleteTodo(todo: Todo, index: number) {
    this.onDeleteTodo.emit({
      index: index,
      todo: todo
    });
  }
}
