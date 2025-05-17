import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  task = {
    title: '',
    description: ''
  };

  tasks: any[] = [];
  message: string = '';
  isError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
  }

  submitTask() {
    const url = 'http://127.0.0.1:8000/api/tasks/';

    this.http.post(url, this.task).subscribe({
      next: (response) => {
        this.message = 'Task submitted successfully!';
        this.isError = false;
        this.task.title = '';
        this.task.description = '';
        this.getTasks(); // Refresh task list
        console.log('Submitted task:', response);
      },
      error: (error) => {
        this.message = 'Failed to submit task.';
        this.isError = true;
        console.error('Submission error:', error);
      }
    });
  }

  getTasks() {
    const url = 'http://127.0.0.1:8000/api/tasks/';

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Fetched tasks:', this.tasks);
      },
      error: (error) => {
        console.error('Failed to fetch tasks:', error);
      }
    });
  }
}
