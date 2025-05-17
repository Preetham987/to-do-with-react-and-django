import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    this.http.post('http://127.0.0.1:8000/api/submit/', this.contact).subscribe(
      res => {
        alert('Message sent!');
        this.contact = { name: '', email: '', message: '' };
      },
      err => {
        alert('Error sending message.');
      }
    );
  }
}
