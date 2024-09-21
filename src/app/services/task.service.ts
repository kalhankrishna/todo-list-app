import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private tasks: Task[] = [];

  constructor() {
    // Initial task list (for testing)
    // this.tasks = [
    //   new Task(1, 'Task 1', 'Description for Task 1', false),
    //   new Task(2, 'Task 2', 'Description for Task 2', false),
    // ];
    // this.tasksSubject.next(this.tasks);
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // Add a new task
  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  // Edit an existing task
  editTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  // Delete a task
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }

  // Toggle task completion
  toggleCompletion(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.tasksSubject.next(this.tasks);
    }
  }
}
