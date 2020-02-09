import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list'; // Mode 1 = add item / Mode 2 visualize items
  public todos: Todo[]   = [];
  public title: String  = 'My tasks';
  public form : FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load(); // Read local storage

  }

  changeMode(mode:string){
    this.mode = mode;
  }

  clear(){
    this.form.reset();
  }

  markAsDone(todo: Todo){
    todo.done = true;
  }

  markAsUndone(todo: Todo){
    todo.done = false;
  }

  // Save task
  add(){
    const title = this.form.controls['title'].value;
    const id    = this.todos.length + 1;
    this.todos.push(new Todo(id,title,false));
    this.save();
    this.clear();
  }

  // Save to localstorage
  save(){
    const data: string = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  // Get from local storage and populate the array
  load(){
    const data = localStorage.getItem('todos');
    if (data){
      this.todos = JSON.parse(data);
    }else {
      this.todos = [];
    }

  }


  // Remove task
  remove( todo: Todo ){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index,1);
    }

  }
}
