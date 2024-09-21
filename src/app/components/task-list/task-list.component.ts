import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, MatListModule, MatDividerModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Subscribe to the tasks$ observable from the service
    this.tasks$ = this.taskService.getTasks();
  }

  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  onToggleTask(taskId: number): void {
    this.taskService.toggleCompletion(taskId);
  }
}
