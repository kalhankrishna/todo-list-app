import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', { validators: [Validators.required], updateOn: 'blur' }],
      description: [''],
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.taskForm.valid) {
      const newTask = new Task(
        Math.random(), // Temporary ID generation
        this.taskForm.value.title,
        this.taskForm.value.description
      );
      this.taskService.addTask(newTask);

      // Use FormGroupDirective to reset form and validation state
      formDirective.resetForm();
    }
  }
}
