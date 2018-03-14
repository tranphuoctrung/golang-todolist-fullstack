import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNewElement: EventEmitter<string> = new EventEmitter<string>();

  element: string;

  constructor() { }

  ngOnInit() {
    this.element = '';
  }

  addTodo() {
    this.onNewElement.emit(this.element);
    this.element = '';
  }

}
