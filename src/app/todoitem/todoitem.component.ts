import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskPriority } from '../enums/priority.enum';

@Component({
  selector: 'todo-component',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.scss'],
})
export class TodoComponent {
  tasks: Array<Task>;
  taskPriorities: TaskPriority;

  @ViewChild('newtaskinput')
  newTaskInputRef: ElementRef<HTMLInputElement>;

  @ViewChild('priorityinput')
  priorityInputRef: ElementRef<HTMLInputElement>;

  @ViewChild('edittaskinput')
  editTaskInputRef: ElementRef<HTMLInputElement>;

  @ViewChild('editpriorityinput')
  editPriorityInputRef: ElementRef<HTMLInputElement>;

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key !== 'Delete') return;

    this.tasks = this.tasks.filter((task) => {
      return !task.checked;
    });
  }

  constructor() {
    this.tasks = [];
  }

  addTask() {
    const taskName = this.newTaskInputRef.nativeElement.value.trim();
    const taskPriority = this.priorityInputRef.nativeElement.value
      .trim()
      .toUpperCase();

    if (taskName === '') return;

    if (!this.validateTask(taskName, taskPriority)) return;

    this.tasks.push({
      text: taskName,
      priority: taskPriority,
      done: false,
      editMode: false,
      checked: false,
    });

    this.newTaskInputRef.nativeElement.value = '';
    this.priorityInputRef.nativeElement.value = '';
  }

  removeTask(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  editTask(editTask: Task) {
    if (this.tasks.find((task) => task.editMode)) {
      alert(
        'A task already exists in edit mode, please finish editing and retry!'
      );
      return;
    }

    this.tasks.forEach((task: Task) => {
      if (task.text === editTask.text) {
        task.editMode = true;
      }
    });
  }

  saveChanges(oldTask: Task) {
    const newTaskName = this.editTaskInputRef.nativeElement.value.trim();
    const newTaskPriority = this.editPriorityInputRef.nativeElement.value.trim();

    if (!this.validateTask(newTaskName, newTaskPriority)) return;

    this.tasks.forEach((task) => {
      if (task.text === oldTask.text) {
        task.text = newTaskName;
        task.priority = newTaskPriority;
        task.editMode = false;
      }
    });
  }

  toggle(task: Task, action: string) {
    if (action === 'state') task.done = !task.done;
    else task.checked = !task.checked;
  }

  validateTask(taskName, taskPriority): boolean {
    if (this.tasks.find((task) => task.text === taskName)) {
      alert(
        'A similar task already exists, please use a different description!'
      );
      return false;
    }

    if (
      taskPriority !== TaskPriority.HIGH &&
      taskPriority !== TaskPriority.LOW &&
      taskPriority !== TaskPriority.MEDIUM
    ) {
      alert('Please enter a valid task priority: High, Medium or Low!');
      return false;
    }

    return true;
  }
}
