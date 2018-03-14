import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';

const headerOptions: any = {headers: new Headers()};
headerOptions.headers.append('Content-Type', 'application/json');
headerOptions.headers.append('Accept', 'application/json');
headerOptions.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
headerOptions.headers.append('Access-Control-Allow-Origin', '*');
headerOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');

const reOptions = new RequestOptions(headerOptions);

@Injectable()
export class TodoListService {

  private static baseUrl = 'http://localhost:8080/api';

  constructor(private http: Http) { }

  store(todo: any) {
    console.log('Storing' + todo);
    return this.http.post(TodoListService.baseUrl + '/todos/create', todo)
      .map(resp => resp.json())
      .catch(res => {
        console.error(res.toString());
        return Observable.throw(res.message || 'Server error');
      });
  }

  getAll() {
    return this.http.get(TodoListService.baseUrl + '/todos/list')
      .map(res => res.json())
      .do(data => console.log(data)) // eyeball results in the console
      .catch(res => {
        console.error(res.toString());
        return Observable.throw(res.message || 'Server error');
      });
  }

  update(todo: Todo) {
    console.log('Update');
    return this.http.put(TodoListService.baseUrl + '/todos/update/' + todo.id, todo)
      .catch(res => {
        console.error(res.toString());
        return Observable.throw(res.message || 'Server error');
      });
  }

  updateTodo(todo: Todo) {
    console.log('Update');
    return this.http.put(TodoListService.baseUrl + '/todos/update/' + todo.id, todo)
      .catch(res => {
        console.error(res.toString());
        return Observable.throw(res.message || 'Server error');
      });
  }

  delete(todo: Todo) {
    return this.http.delete(TodoListService.baseUrl + '/todos/delete/' + todo.id)
      .catch(res => {
        console.error(res.toString());
        return Observable.throw(res.message || 'Server error');
      });
    // return this.http.put(TodoListService.baseUrl + '/todos/delete/' + todo.id, todo)
    //   .catch(res => {
    //     console.error(res.toString());
    //     return Observable.throw(res.message || 'Server error');
    //   });
  }

}
