import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskComponent],  // 👈 This line is important
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'task-manager';
}
