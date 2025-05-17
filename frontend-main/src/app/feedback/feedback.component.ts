import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  feedback = {
    name: '',
    rating: '',
    comments: ''
  };

  feedbackList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFeedbacks();
  }

  submitFeedback() {
    this.http.post('http://127.0.0.1:8000/api/submit/', this.feedback).subscribe(
      () => {
        alert("Feedback submitted!");
        this.feedback = { name: '', rating: '', comments: '' };
        this.loadFeedbacks();
      },
      err => {
        console.error(err);
        alert("Error submitting feedback.");
      }
    );
  }

  loadFeedbacks() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/submit/').subscribe(
      data => {
        this.feedbackList = data;
      },
      err => {
        console.error("Error loading feedbacks:", err);
      }
    );
  }
}
